import amqp from "amqplib";

export const connectRabbitMQ = async () => {
  try {
    const RABBITMQ_USER = process.env.RABBITMQ_USER;
    const RABBITMQ_PASS = process.env.RABBITMQ_PASS;
    const RABBITMQ_HOST = process.env.RABBITMQ_HOST;
    const RABBITMQ_PORT = process.env.RABBITMQ_PORT;

    const connection = await amqp.connect(
      `amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`,
    );
    const channel = await connection.createChannel();
    console.log("Connected to RabbitMQ");

    return {
      connection,
      channel,
    };
  } catch (err) {
    console.error("Error connecting to RabbitMQ: ", err);
    throw err;
  }
};
