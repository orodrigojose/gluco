export enum Source {
  TELEGRAM,
  WHATSAPP,
  DISCORD
}

export type GlucoIntegration = {
  source: Source,
  message: string
}