export type WebHookData = {
  source: string;
  message: string;

  replyContext: {
    messageId?: Number
    chatId?: Number
  }
}