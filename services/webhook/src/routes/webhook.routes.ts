import type { FastifyInstance } from "fastify";
import { WebhookController } from "../controllers/webhook.controller";
import WebHookService from "../services/webhook.service";

export const webhookRoutes = async (fastify: FastifyInstance) => {
  const { channel } = fastify.rabbit!;
  const service = new WebHookService(channel);
  const controller = new WebhookController(service);

  fastify.post("/v1/webhook/gluco", controller.registerGluco);
};
