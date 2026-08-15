
import dotenv from "dotenv";
import type { Env } from "../types";

dotenv.config();

export const env: Env = {
    RABBITMQ_USER: process.env.RABBITMQ_USER!,
    RABBITMQ_PASS: process.env.RABBITMQ_PASS!,
    RABBITMQ_HOST: process.env.RABBITMQ_HOST!,
    RABBITMQ_PORT: parseInt(process.env.RABBITMQ_PORT!),
}