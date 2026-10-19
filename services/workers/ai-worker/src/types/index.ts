export type Prompt = {
  model: string;
  input: string;
};

export type Env = {
  RABBITMQ_HOST: string;
  RABBITMQ_USER: string;
  RABBITMQ_PASS: string;
  RABBITMQ_PORT: number;
  GEMINI_API_KEY: string;
  API_URL: string;
};

export enum Source {
  TELEGRAM = "TELEGRAM",
  WHATSAPP = "WHATSAPP",
  DISCORD = "DISCORD",
}

export enum MealPeriod {
  BREAKFAST = "BREAKFAST",
  LUNCH = "LUNCH",
  SNACK = "SNACK",
  DINNER = "DINNER",
}

export type Glico = {
  source: Source;
  value: number;
  message: string;
  note: string;
  recommendation: string;
  mealPeriod: MealPeriod;
};

export type QueueBody = {
  source: Source,
  value: number | null,
  message: string,
  mealPeriod: MealPeriod | null,

  analysis: {
    recommendation: string,
    note: string,
  }

  replyContext?: {
    messageId?: number
    chatId?: number
  }
}