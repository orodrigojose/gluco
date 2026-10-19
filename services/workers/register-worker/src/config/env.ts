import dotenv from "dotenv";
import type { Env } from "../types/env";

dotenv.config();

export const env: Env = {
  RABBITMQ_HOST: process.env.RABBITMQ_HOST!,
  RABBITMQ_USER: process.env.RABBITMQ_USER!,
  RABBITMQ_PASS: process.env.RABBITMQ_PASS!,
  RABBITMQ_PORT: parseInt(process.env.RABBITMQ_PORT!),
  API_URL: process.env.API_URL!
};
