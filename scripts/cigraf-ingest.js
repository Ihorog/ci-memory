#!/usr/bin/env node
'use strict';

/**
 * Cigrafin mailbox ingest for Ihorog/ci-memory.
 * Calls living classifySignal + routeTask from Ci-Contact-Kernel.
 * Does not mint CLASSIFICATIONS. Does not execute physical action.
 * COMPLETED is never written from this script.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = process.env.CIGRAFIN_ROOT || process.cwd();
const BASKET = path.join(ROOT, 'Cigrafin');
const INBOX = path.join(BASKET, 'INBOX');
const INDEX = path.join(BASKET, 'INDEX', 'cigraf.jsonl');
const QUARANTINE = path.join(BASKET, 'QUARANTINE');
const KERNEL_SRC = process.env.KERNEL_SRC || path.join(ROOT, '.kernel-src', 'src');
const KERNEL_URL = (process.env.CI_KERNEL_URL || 'https://ci-contact-kernel.vercel.app').replace(/\/$/, '');

const SKIP_NAMES = new Set(['README.md', '.gitkeep']);
const SKIP_DIRS = new Set(['INDEX', 'SCHEMA', 'QUARANTINE']);

const CLASSIFICATION_PERMISSION_MAP = {
  deploy_action: 'L5_DEPLOY_OR_DEVICE_ACTION',
  device_action: 'L5_DEPLOY_OR_DEVICE_ACTION',
  service_action: 'L4_EXTERNAL_API_WRITE',
  repo_action: 'L3_REPO_WRITE',
  human_action: 'L2_LOCAL_WRITE',
  task: 'L1_DRAFT',
};

const GATE_BY_DOMAIN = {
  ACTION: 'ask+executor+evidence',
  HOME: 'ask+executor+evidence',
  DATA: 'allow+evidence',
  'CI+': 'allow',
};

function loadKernel() {
  const classifierPath = path.join(KERNEL_SRC, 'classifier.js');
  const routerPath = path.join(KERNEL_SRC, 'router.js');
  if (!fs.existsSync(classifierPath) || !fs.existsSync(routerPath)) {
    throw new Error('KERNEL_SRC missing classifier/router: ' + KERNEL_SRC);
  }
  return {
    classifySignal: require(classifierPath).classifySignal,
    routeTask: require(routerPath).routeTask,
  };
}

function inferDomain(text, classification) {
  const t = String(text || '').toLowerCase();
  if (/\b(ci\+|огляд контуру|верхн)/i.test(t)) return 'CI+';
  if (/(дім|домівка|житло|лічильник|фідер|обладнання|device|hardware)/i.test(t)) return 'HOME';
  if (/(рахунок|оплата|гривн|invoice|iban|грн)/i.test(t)) return 'FIN';
  if (/(проєкт|репозитор|pull request|\bpr\b|deploy|commit)/i.test(t)) return 'WORK';
  if (/(родин|здоров|настрій|family)/i.test(t)) return 'LIFE';
  if (String(classification).endsWith('_action') || classification === 'task') return 'ACTION';
  return 'DATA';
}

function inferLevel(classification) {
  return CLASSIFICATION_PERMISSION_MAP[classification] || 'L0_READ';
}

function inferGate(domain, classification) {
  if (classification === 'unknown') return 'quarantine';
  return GATE_BY_DOMAIN[domain] || 'deny';
}

function inferStatus(classification, gate) {
  if (classification === 'unknown' || gate === 'quarantine') return 'UNKNOWN';
  if (classification === 'human_action') return 'WAITING_APPROVAL';
  if (gate === 'ask+executor+evidence' || gate === 'deny') return 'WAITING_PERMISSION';
  return 'CLASSIFIED';
}

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function makeId(hash) {
  const day = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = crypto.randomBytes(2).toString('hex').toUpperCase();
  return 'CG-' + day + '-' + rand + '-' + hash.slice(0, 8);
}

function walk(dir, acc) {
  acc = acc || [];
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (SKIP_DIRS.has(name)) continue;
      walk(full, acc);
    } else if (!SKIP_NAMES.has(name)) {
      acc.push(full);
    }
  }
  return acc;
}

function readIndex() {
  if (!fs.existsSync(INDEX)) return [];
  return fs.readFileSync(INDEX, 'utf8').split('\n').filter(Boolean).map(function (line) {
    try { return JSON.parse(line); } catch (e) { return null; }
  }).filter(Boolean);
}

function appendIndex(envelope) {
  fs.mkdirSync(path.dirname(INDEX), { recursive: true });
  fs.appendFileSync(INDEX, JSON.stringify(envelope) + '\n');
}

function writeQuarantine(envelope) {
  fs.mkdirSync(QUARANTINE, { recursive: true });
  fs.writeFileSync(path.join(QUARANTINE, envelope.id + '.json'), JSON.stringify(envelope, null, 2));
}

async function postSignal(payload) {
  try {
    const res = await fetch(KERNEL_URL + '/ci/signal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-ci-operator-id': 'cigraf-ingest' },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    let body;
    try { body = JSON.parse(text); } catch (e) { body = { raw: text.slice(0, 300) }; }
    return { ok: res.ok || res.status === 202, status: res.status, body: body };
  } catch (err) {
    return { ok: false, status: 0, body: { error: String(err.message).slice(0, 300) } };
  }
}

async function main() {
  fs.mkdirSync(INBOX, { recursive: true });
  fs.mkdirSync(path.dirname(INDEX), { recursive: true });
  fs.mkdirSync(QUARANTINE, { recursive: true });

  const k = loadKernel();
  const existing = readIndex();
  const seen = new Set(existing.map(function (e) { return e.raw && e.raw.sha256; }).filter(Boolean));

  const files = walk(INBOX);
  const ollin = path.join(BASKET, 'ollin');
  if (fs.existsSync(ollin)) files.push(ollin);

  const report = [];
  for (const file of files) {
    const buf = fs.readFileSync(file);
    const hash = sha256(buf);
    if (seen.has(hash)) {
      report.push({ path: path.relative(ROOT, file), result: 'duplicate' });
      continue;
    }
    const rel = path.relative(ROOT, file);
    const excerpt = buf.slice(0, 4000).toString('utf8').replace(/\u0000/g, '');
    const payload = {
      type: 'signal',
      text: excerpt,
      filename: path.basename(file),
      path: rel,
      source: 'cigrafin',
      directed_by: 'kazkar',
    };
    const classification = k.classifySignal(payload);
    const routed = k.routeTask({ classification: classification, payload: payload });
    const domain = inferDomain(excerpt, classification);
    const permissionLevel = inferLevel(classification);
    const gate = inferGate(domain, classification);
    const taskStatus = inferStatus(classification, gate);
    const newKind = classification === 'unknown';

    const envelope = {
      schema: 'ci.graf.envelope.v1',
      id: makeId(hash),
      received_at: new Date().toISOString(),
      source: { channel: 'github', repo: 'Ihorog/ci-memory', path: rel, directed_by: 'kazkar' },
      raw: { filename: path.basename(file), media_type: 'application/octet-stream', sha256: hash, bytes: buf.length, text_excerpt: excerpt.slice(0, 240) },
      domain: domain,
      cimeika_module: 'Казкар',
      classification: classification,
      targetNode: routed.targetNode,
      executionCenter: routed.executionCenter,
      permissionLevel: permissionLevel,
      gate: gate,
      taskStatus: taskStatus,
      intake: 'POST /ci/signal',
      kernel_class: classification,
      new_kind: newKind,
      reason: newKind ? 'classifySignal=unknown' : 'closed-tuple-from-kernel',
      proof: { executor: null, evidence_id: null, completed: false },
      kernel: { url: KERNEL_URL, http: null, task_id: null, kernel_status: null },
    };

    if (newKind || gate === 'quarantine') {
      writeQuarantine(envelope);
      appendIndex(envelope);
      seen.add(hash);
      report.push({ path: rel, result: 'QUARANTINE', id: envelope.id, classification: classification });
      continue;
    }

    const posted = await postSignal({
      type: 'signal',
      text: excerpt.slice(0, 1500),
      classification: classification,
      domain: domain,
      source: 'cigrafin:' + rel,
      filename: path.basename(file),
      sha256: hash,
      directed_by: 'kazkar',
    });
    envelope.kernel.http = posted.status;
    envelope.kernel.task_id = (posted.body && posted.body.task && posted.body.task.id) || null;
    envelope.kernel.kernel_status = (posted.body && posted.body.task && posted.body.task.status) || null;
    if (!posted.ok) envelope.reason = 'kernel_signal_unavailable http=' + posted.status;
    if (posted.body && posted.body.task && posted.body.task.status === 'COMPLETED') {
      envelope.proof.completed = false;
      envelope.reason += '; basket-forbids-local-COMPLETED-copy';
    }
    appendIndex(envelope);
    seen.add(hash);
    report.push({ path: rel, result: posted.ok ? 'Результат' : 'Недоступно', id: envelope.id, classification: classification, domain: domain, node: routed.targetNode, task: envelope.kernel.task_id });
  }

  const out = { scanned: files.length, written: report.filter(function (r) { return r.result !== 'duplicate'; }).length, report: report };
  fs.mkdirSync(path.join(BASKET, 'INDEX'), { recursive: true });
  fs.writeFileSync(path.join(BASKET, 'INDEX', 'last-run.json'), JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));
}

main().catch(function (err) {
  console.error(err);
  process.exit(1);
});
