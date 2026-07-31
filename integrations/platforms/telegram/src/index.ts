import { Telegraf } from "telegraf";
import { hi } from "./commands";
import registerCommand from "./helpers/registerCommand";

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const MY_TELEGRAM_ID = parseInt(process.env.TELEGRAM_USERID!, 10);
const WEBHOOK_URL = process.env.WEBHOOK_URL;

const bot = new Telegraf(TELEGRAM_TOKEN as string);
const hiRegExp = /^(hi|hello)$/i;

bot.use(async (ctx, next) => {
  const userId = ctx.from?.id;
  if (userId === MY_TELEGRAM_ID) return next();
  return ctx.reply("You're welcome!");
});

bot.use(async (ctx, next) => {
  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "telegram",
      message: ctx.message?.text,
    }),
  });

  const data = await response.json();
  ctx.reply(data.message);
});

registerCommand(bot, hiRegExp, hi);

bot.command("status", (ctx) => {
  ctx.reply("Running normally.");
});
bot.launch(() => {
  console.log("Bot is running");
});
