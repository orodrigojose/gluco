import { Telegraf } from "telegraf";
import { env } from "../config/env";
import { registerCommands } from "./commands";
import registerMiddlewares from "./middleware";
import registerListeners from "./listeners";
import { startTelegramReplyConsumer } from "../services/telegram/reply.consumer.service";

class Bot {
  private bot: Telegraf;

  public constructor(token: string) {
    this.bot = new Telegraf(token);
  }

  private setup() {
    registerMiddlewares(this.bot);
    registerCommands(this.bot as unknown as Parameters<typeof registerCommands>[0]);
    registerListeners(this.bot);
  }

  public async start() {
    this.setup();
    await startTelegramReplyConsumer(this.bot);
    this.bot.launch(() => console.log("Bot running..."));
  }
}

export const bot = new Bot(env.BOT_TOKEN);
