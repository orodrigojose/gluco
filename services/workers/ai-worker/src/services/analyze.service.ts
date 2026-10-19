import GeminiAi from "../ai/gemini";
import type { Channel } from "amqplib";
import type { QueueBody } from "../types";

export default class AnalyzeService {
  private geminiAi: GeminiAi = new GeminiAi();
  private COMPLETED_EXCHANGE = "glucose.analysis.completed";

  public async run(gluco: string, channel: Channel) {
    const outputText = (
      await this.geminiAi.interact(gluco)
    ).output_text;

    if (outputText === undefined) throw new Error("Gemini response did not contain output text");

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
      value: aiAnalysis.value,
      message: input.message,
      mealPeriod: aiAnalysis.mealPeriod,
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

    await channel.assertExchange(this.COMPLETED_EXCHANGE, "topic", {
      durable: true,
    });
    channel.publish(
      this.COMPLETED_EXCHANGE,
      routingKey,
      Buffer.from(JSON.stringify(data)),
      {
        persistent: true,
      },
    );
  }
}