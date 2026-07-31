import type { Telegraf } from "telegraf";
import type { CommandFn } from "../types";

export default function fn(bot: Telegraf, reg: RegExp, cmd: CommandFn) {
  bot.start(cmd);
  bot.hears(reg, cmd);
  bot.command(reg, cmd);
  bot.action(reg, cmd);
};