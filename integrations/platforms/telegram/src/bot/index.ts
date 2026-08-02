import { Telegraf } from "telegraf";
import { env } from "../config/env";
import { registerCommands } from "./commands";
import registerMiddlewares from "./middleware";
import registerListeners from "./listeners";

class Bot {
  private bot: Telegraf;

  public constructor(token: string) {
    this.bot = new Telegraf(token);
  }

  private setup() {
    registerMiddlewares(this.bot);
    registerCommands(this.bot);
    registerListeners(this.bot);
  }

  public start() {
    this.setup();
    this.bot.launch(() => console.log("Bot running..."));
  }
}

export const bot = new Bot(env.BOT_TOKEN);
