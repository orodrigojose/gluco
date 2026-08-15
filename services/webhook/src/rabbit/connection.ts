import amqp, { type Channel, type Connection } from "amqplib";
import { env } from "../config/env";

export async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(`amqp://${env.RABBITMQ_USER}:${env.RABBITMQ_PASS}@${env.RABBITMQ_HOST}:${env.RABBITMQ_PORT}`);
    const channel = await connection.createChannel();

    return {
      connection,
      channel,
    };
  } catch (err) {
    console.error("Error connecting to RabbitMQ: ", err);
    throw err;
  }
}