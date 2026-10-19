import { z } from "zod";

const enumString = <T extends readonly [string, ...string[]]>(values: T) =>
  z.preprocess(
    (value) => (typeof value === "string" ? value.trim().toUpperCase() : value),
    z.enum(values),
  );

export const AnalysisCompleted = z.object({
  source: enumString(["TELEGRAM", "WHATSAPP", "DISCORD"]),
  value: z.number().nullable(),
  message: z.string(),
  mealPeriod: z.preprocess(
    (value) => (typeof value === "string" ? value.trim().toUpperCase() : value),
    z.enum(["BREAKFAST", "LUNCH", "SNACK", "DINNER"]).nullable(),
  ),
  analysis: z.object({
    recommendation: z.string(),
    note: z.string().nullable(),
  }),
  replyContext: z.object({
    messageId: z.number().nullable(),
    chatId: z.number().nullable(),
  }),
});

export type AnalysisCompleted = z.infer<typeof AnalysisCompleted>;