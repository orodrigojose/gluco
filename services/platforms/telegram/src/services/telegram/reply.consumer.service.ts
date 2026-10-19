import amqp from "amqplib";
import { env } from "../../config/env";

const EXCHANGE = "glucose.analysis.completed";
const QUEUE = "replies.telegram";

export const startTelegramReplyConsumer = async (bot: {
  telegram: {
    sendMessage: (
      chatId: number,
      text: string,
      options?: { reply_parameters?: { message_id: number } },
    ) => Promise<unknown>;
  };
}) => {
  const RABBITMQ_USER = env.RABBITMQ_USER;
  const RABBITMQ_PASS = env.RABBITMQ_PASS;
  const RABBITMQ_HOST = env.RABBITMQ_HOST;
  const RABBITMQ_PORT = env.RABBITMQ_PORT;

  const connection = await amqp.connect(
    `amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`,
  );

  const channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE, "topic", { durable: true });
  await channel.assertQueue(QUEUE, { durable: true });
  await channel.bindQueue(QUEUE, EXCHANGE, "analysis.completed.telegram");

  await channel.consume(QUEUE, async (message) => {
    if (!message) return;

    try {
      const result = JSON.parse(message.content.toString());
      const { chatId, messageId } = result.replyContext ?? {};

      if (typeof chatId !== "number")
        throw new Error("Telegram reply is missing replyContext.chatId");

      const sendOptions =
        typeof messageId === "number"
          ? { reply_parameters: { message_id: messageId } }
          : undefined;

      await bot.telegram.sendMessage(
        chatId,
        result.analysis.recommendation,
        sendOptions,
      );

      channel.ack(message);
    } catch (error) {
      console.error("Failed to send Telegram reply: ", error);
      channel.nack(message, false, false);
    }
  });

  console.log(`Waiting for messages in ${QUEUE}`);
  return { connection, channel };
};
