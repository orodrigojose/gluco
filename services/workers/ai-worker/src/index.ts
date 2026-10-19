import GeminiAi from "./ai/gemini";
import { consumeMessages } from "./rabbit/consumer";
import GlicoService from "./services/glico.service";
import type { Channel } from "amqplib";
import type { QueueBody } from "./types";

const geminiAi = new GeminiAi();
const glicoService = new GlicoService();
const COMPLETED_EXCHANGE = "glucose.analysis.completed";

const analyze = async (gluco: string, channel: Channel) => {
  const outputText = (await geminiAi.interact(gluco)).output_text;
  if (outputText === undefined)
    throw new Error("Gemini response did not contain output text");
  const aiAnalysis = JSON.parse(outputText);

  const input = JSON.parse(gluco) as {
    source: QueueBody["source"];
    message: string;
    replyContext: {
      messageId?: number;
      chatId?: number;
    };
  };

  const data: QueueBody = {
    source: input.source,
    message: input.message,
    analysis: {
      recommendation: aiAnalysis.recommendation,
      note: aiAnalysis.note,
    },
    replyContext: {
      messageId: input.replyContext.messageId,
      chatId: input.replyContext.chatId,
    },
  };

  const routingKey = `analysis.completed.${data.source}`;

  await glicoService.register(aiAnalysis);
  await channel.assertExchange(COMPLETED_EXCHANGE, "topic", { durable: true });
  channel.publish(
    COMPLETED_EXCHANGE,
    routingKey,
    Buffer.from(JSON.stringify(data)),
    {
      persistent: true,
    },
  );
};

consumeMessages("analysis.requested", analyze);
