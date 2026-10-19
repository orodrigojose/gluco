import type { FastifyReply, FastifyRequest } from "fastify";
import WebHookService from "../services/webhook.service";
import type { GlucoIntegration } from "../types";

export class WebhookController {
  constructor(private service: WebHookService) {}

  registerGluco = async (request: FastifyRequest, reply: FastifyReply) => {
    const glucoAnalysis = request.body as GlucoIntegration;
    const response = await this.service.sendGlucoToQueue(glucoAnalysis);

    return reply.status(200).send(response);
  };
}
