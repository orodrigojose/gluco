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

export type CommandFn = (ctx: Context) => void;
