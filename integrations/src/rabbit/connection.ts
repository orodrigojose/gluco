import amqp, { type Channel, type Connection } from "amqplib";

export async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://myuser:mypassword@localhost:8090");
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