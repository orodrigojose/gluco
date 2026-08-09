import start from "./start.command";
import type { Telegraf } from "telegraf";

export function registerCommands(
  bot: Telegraf<Parameters<typeof start.fn>[0]>,
) {
  bot.command(start.name, start.fn);
}
