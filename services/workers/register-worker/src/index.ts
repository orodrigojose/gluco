import amqp from "amqplib";
import axios from "axios";
import { env } from "./config/env";
import { AnalysisCompleted } from "./types/analysis";
import GlicoService from "./services/glico.service";

const QUEUE = "completed.register";
const EXCHANGE = "glucose.analysis.completed";
const glicoService = new GlicoService();

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function withRetry(fn: () => Promise<void>) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn();
    } catch (err) {
      await sleep(2000 * 2 ** (attempt - 1));
    }
  }
}

const conn = await amqp.connect({
  protocol: "amqp",
  hostname: env.RABBITMQ_HOST,
  port: Number(env.RABBITMQ_PORT),
  username: env.RABBITMQ_USER,
  password: env.RABBITMQ_PASS,
  vhost: "/",
});
const ch = await conn.createChannel();

await ch.assertExchange(EXCHANGE, "topic", { durable: true });
await ch.assertQueue(`${QUEUE}.dlq`, { durable: true });
await ch.assertQueue(QUEUE, {
  durable: true,
  arguments: {
    "x-dead-letter-exchange": "",
    "x-dead-letter-routing-key": `${QUEUE}.dlq`,
  },
});
await ch.bindQueue(QUEUE, EXCHANGE, "analysis.completed.#");
await ch.prefetch(5);

await ch.consume(QUEUE, async (raw) => {
  if (!raw) return;

  try {
    const data = JSON.parse(raw.content.toString());
    const aiAnalysis = AnalysisCompleted.parse(data);

    const response = await glicoService.register({
      source: aiAnalysis.source,
      value: aiAnalysis.value,
      message: aiAnalysis.message,
      note: aiAnalysis.analysis.note,
      recommendation: aiAnalysis.analysis.recommendation,
      mealPeriod: aiAnalysis.mealPeriod,
    });

    await withRetry(async () => console.log(aiAnalysis));
    ch.ack(raw)
  } catch(err) {
    if (axios.isAxiosError(err)) {
      console.error("Glico API error:", err.response?.status, err.response?.data);
    } else {
      console.error((err as Error).message);
    }
    ch.nack(raw, false, false)
  }
})

process.on("SIGTERM", async () => {
  await ch.close();
  await conn.close();
})