import { connectRabbitMQ } from "./connection.ts";

export const consumeMessages = async (queue: string, fn: (gluco: string) => void) => {
  const { channel } = await connectRabbitMQ();

  await channel.assertQueue(queue, { durable: true });

  console.log(`Waiting for messages in ${queue}...`);

  channel.consume(queue, (message: any) => {
    if (message) {
      console.log(`Received: ${message.content.toString()}`);
      fn(message.content.toString());
      channel.ack(message);
    }
  })
};