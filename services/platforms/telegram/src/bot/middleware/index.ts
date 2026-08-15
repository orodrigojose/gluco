import { Telegraf } from "telegraf";
import { registerAuthMiddleware } from "./auth.middleware";

export default function registerMiddlewares(bot: Telegraf) {
  registerAuthMiddleware(bot);
}
