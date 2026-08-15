import type { Telegraf } from "telegraf";
import { env } from "../../config/env";

export function registerAuthMiddleware(bot: Telegraf) {
  bot.use(async (ctx, next) => {
    const userId = ctx.from?.id;


    if (userId === env.USER_ID) {
      return next();
    }

    return ctx.reply("Action don't allowed!");
  });
}
