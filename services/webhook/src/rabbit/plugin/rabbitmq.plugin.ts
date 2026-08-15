import fp from "fastify-plugin";
import { connectRabbitMQ } from "../connection";
import type { FastifyInstance } from "fastify";

export const rabbitmqPlugin = fp(async (fastify: FastifyInstance) => {
  const queue = "gluco";
  const { channel, connection } = await connectRabbitMQ();

  await channel.assertQueue(queue, { durable: true });

  fastify.decorate("rabbit", { channel, connection } as any);
  fastify.addHook("onClose", async () => {
    await channel.close();
    await connection.close();
  });
});
