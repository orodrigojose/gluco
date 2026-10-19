import { Context as TelegrafContext } from "telegraf";
import type { Message as TelegrafMessage } from "telegraf/types";

export type Message = {
  text?: TelegrafMessage.TextMessage;
  photo?: TelegrafMessage.PhotoMessage;
  video?: TelegrafMessage.VideoMessage;
};

export type Session = {
  messages: Message[];
  mediaGroupIds: string[];
};

export type Context = TelegrafContext & {
  session: Session;
};

export type Env = {
  BOT_TOKEN: string;
  USER_ID: number;
  WEBHOOK_URL: string;
  RABBITMQ_HOST: string;
  RABBITMQ_USER: string;
  RABBITMQ_PASS: string;
  RABBITMQ_PORT: number;
}

export type Command<T = void> = {
  name: string;
  description: string;
  fn: (ctx: Context) => Promise<T>;
};