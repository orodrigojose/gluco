import { connectRabbitMQ } from "./connection.ts";
import type { Channel } from "amqplib";

export const consumeMessages = async (
  queue: string,
  fn: (gluco: string, channel: Channel) => void | Promise<void>,
) => {
  const { channel } = await connectRabbitMQ();

  await channel.assertQueue(queue, {
    durable: true,
    arguments: {
      "x-dead-letter-exchange": "",
      "x-dead-letter-routing-key": "analysis.requested.dlq",
    },
  });

  console.log(`Waiting for messages in ${queue}...`);

  channel.consume(queue, async (message: any) => {
    if (!message) return;

    try {
      const content = message.content.toString();
      await fn(content, channel);
      channel.ack(message);
    } catch (error) {
      console.error("Failed to process message:", error);
      channel.nack(message, false, false);
    }
  });
};