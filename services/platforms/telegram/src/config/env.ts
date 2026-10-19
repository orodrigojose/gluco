import dotenv from "dotenv";
import type { Env } from "../types";

dotenv.config();

export const env: Env = {
  BOT_TOKEN: process.env.TELEGRAM_TOKEN!,
  USER_ID: parseInt(process.env.TELEGRAM_USERID!, 10)!,
  WEBHOOK_URL: process.env.WEBHOOK_URL!,
  RABBITMQ_HOST: process.env.RABBITMQ_HOST!,
  RABBITMQ_USER: process.env.RABBITMQ_USER!,
  RABBITMQ_PASS: process.env.RABBITMQ_PASS!,
  RABBITMQ_PORT: parseInt(process.env.RABBITMQ_PORT!),
};