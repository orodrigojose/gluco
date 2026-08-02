import type { Telegraf } from "telegraf";
import webhookService from "../../services/webhook/webhook.service";

function validateMessage(text: string) {
  const normalized = text.toLowerCase();
  const hasHiLow = /\b(hi|low)\b/i.test(normalized);
  const hasGlycemiaStatus =
    /\b(hipoglicemia|hipo|hipoglicemia|hiperglicemia|hiper)\b/i.test(
      normalized,
    );

  return {
    validated: hasHiLow || hasGlycemiaStatus,
    hasHiLow,
    hasGlycemiaStatus,
  };
}

export function registerTextListener(bot: Telegraf) {
  bot.on("text", async (ctx, next) => {
    try {
      const text = ctx.message.text;
      const validation = validateMessage(text);

      if (!text || !validation.validated)
        return ctx.reply("Please send a valid messsage. 💙");

      const data = await webhookService.send({
        source: "telegram",
        message: text,
      });

      ctx.reply(data.message);
    } catch (err) {
      console.error(err);
      ctx.reply("An trouble occurred while recording blood glucose... 😭");
    }
  });
}
