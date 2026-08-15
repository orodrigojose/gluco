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
  TELEGRAM,
  WHATSAPP,
  DISCORD,
}

export enum MealPeriod {
  BREAKFAST,
  LUNCH,
  SNACK,
  DINNER,
}

export type Glico = {
  source: Source;
  value: number;
  message: string;
  note: string;
  recommendation: string;
  mealPeriod: MealPeriod;
};
