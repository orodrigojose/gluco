import type { Channel } from "amqplib";
import { sendMessage } from "../rabbit/producer";
import type { GlucoIntegration } from "../types";

export default class WebHookService {
  constructor (private channel: Channel) {}

  sendGlucoToQueue = async (gluco: GlucoIntegration) => { 
    const queue = "gluco";
    const response = await sendMessage(
      queue,
      JSON.stringify(gluco),
      this.channel
    );
    return response;
  }
}
