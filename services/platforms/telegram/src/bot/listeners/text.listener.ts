import type { Telegraf } from "telegraf";
import webhookService from "../../services/webhook/webhook.service";

function validateMessage(text: string) {
  const normalized = text.toLowerCase();
  const hasHiLow = /\b(hi|low)\b/i.test(normalized);
  const hasGlycemiaStatus = /\b(hipoglicemia|hipo|hiperglicemia|hiper)\b/i.test(
    normalized,
  );

  const hasNumber = /\d+/.test(normalized);

  return {
    validated: hasHiLow || hasGlycemiaStatus || hasNumber,
    hasHiLow,
    hasGlycemiaStatus,
    hasNumber,
  };
}

export function registerTextListener(bot: Telegraf) {
  bot.on("text", async (ctx, next) => {
    try {
      const text = ctx.message.text;
      const validation = validateMessage(text);

      if (!validation.validated) return next();

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

  bot.on("message", async (ctx) => {
    await ctx.reply(
      "Não entendi esse formato. 💙\n\n" +
        "Tente enviar algo como:\n" +
        "• *110*\n" +
        "• *220 pós almoço*\n" +
        "• *hipo*",
      { parse_mode: "Markdown" },
    );
  });
}
