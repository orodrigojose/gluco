import { Channel, Connection } from "amqplib";

declare module "fastify" {
  interface FastifyInstance {
    rabbit: {
      channel: Channel;
      connection: Connection;
    };
  }
}
