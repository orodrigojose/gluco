import type { Telegraf } from "telegraf";
import { registerTextListener } from "./text.listener";

export default function registerListeners(bot: Telegraf) {
  registerTextListener(bot);
}
