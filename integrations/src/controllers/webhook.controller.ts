import type { FastifyReply, FastifyRequest } from "fastify";
import WebHookService from "../services/webhook.service";
import type { GlucoIntegration } from "../types";

export class WebhookController {
  constructor(private service: WebHookService) {}

  registerGluco = async (request: FastifyRequest, reply: FastifyReply) => {
    const response = await this.service.sendGlucoToQueue(
      request.body as GlucoIntegration,
    );

    return reply.status(200).send(response);
  };
}
