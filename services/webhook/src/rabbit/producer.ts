import type { Channel } from "amqplib";

export async function sendMessage(
  queue: string,
  message: string,
  channel: Channel,
) {
  const correlationId = crypto.randomUUID();

  channel.sendToQueue(queue, Buffer.from(message), { correlationId });

  return {
    id: correlationId,
    accepted: true,
    message: "Gluco accepted.",
  };
}
