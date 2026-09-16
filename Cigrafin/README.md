# Cigrafin — корзина Ci Graf

Поштовий ящик. Не класифікатор. Не ядро. Не Домівка.

Казкар направляє сюди будь-які дані. Механізм обгортає конверт і викликає живі осі Ci-Contact-Kernel.

Ядро: https://github.com/Ihorog/Ci-Contact-Kernel

```
Cigrafin/
  INBOX/        сирий вхід
  QUARANTINE/   unknown / drift
  INDEX/        cigraf.jsonl
  SCHEMA/       дзеркало номенклатури
```

Правило: classifySignal ядра. POST /ci/signal. COMPLETED з цієї папки не існує.

Кидай сире в INBOX/.
