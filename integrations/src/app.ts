import Fastify from "fastify";
import { webhookRoutes } from "./routes/webhook.routes";
import { rabbitmqPlugin } from "./rabbit/plugin/rabbitmq.plugin";

const app = Fastify({ logger: true });

await app.register(rabbitmqPlugin);
await app.register(webhookRoutes, { prefix: "/v1/webhook" });

export { app };
