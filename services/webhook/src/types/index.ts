export enum Source {
  TELEGRAM,
  WHATSAPP,
  DISCORD
}

export type GlucoIntegration = {
  source: Source,
  message: string
}

export type Env = {
  RABBITMQ_HOST: string;
  RABBITMQ_USER: string;
  RABBITMQ_PASS: string;
  RABBITMQ_PORT: number;
};