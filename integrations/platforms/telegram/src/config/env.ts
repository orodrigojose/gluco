import dotenv from "dotenv";
import type { Env } from "../types";

dotenv.config();

export const env: Env = {
  BOT_TOKEN: process.env.BOT_TOKEN!,
  USER_ID: parseInt(process.env.USER_ID!, 10)!,
  WEBHOOK_URL: process.env.WEBHOOK_URL!
}