import { Context, Telegraf } from "telegraf";
import { env } from "../config/env";
import registerCommand from "./registerCommand";
import { hi } from "../commands";
import webhookService from "../services/webhook/webhook.service";

function validateMessage(text: string) {
  const normalized = text.toLowerCase();
  const hasHiLow = /\b(hi|low)\b/i.test(normalized);
  const hasGlycemiaStatus =
    /\b(hipoglicemia|hipo|hipoglicemia|hiperglicemia|hiper)\b/i
      .test(normalized);

  return {
    validated: hasHiLow || hasGlycemiaStatus,
    hasHiLow,
    hasGlycemiaStatus,
  };
}

export const bot = new Telegraf(env.BOT_TOKEN);

bot.use(async (ctx, next) => {
  const userId = ctx.from?.id;
  if (userId === env.USER_ID) return next();
  return ctx.reply("You're welcome!");
});

registerCommand(bot, "start", hi);

bot.on("text", async (ctx, next) => {
  try {
    const text = ctx.message.text;
    const validation = validateMessage(text);

    if (!text || !validation.validated)
      return ctx.reply("Envie uma mensagem válida");

    const data = await webhookService.send({
      source: "telegram",
      message: text,
    });

    ctx.reply(data.message);
  } catch (err) {
    console.error(err);
    ctx.reply("Api não disponivel no momento...");
  }
});
