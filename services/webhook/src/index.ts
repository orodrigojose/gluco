import { app } from "./app";

const PORT = 3000;

const start = async () => {
  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
  } catch (err) {
    console.error(err);
  }
};

start();
