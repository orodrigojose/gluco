import { GoogleGenAI } from "@google/genai";
import prompt from "../config/prompt";
import { env } from "../config/env";

import type { Prompt } from "../types";

export default class GeminiAi {
  private prompt: Prompt;
  private core: GoogleGenAI;

  constructor() {
    this.core = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
    this.prompt = prompt;
  }

  public async interact(gluco: string) {
    this.prompt.input += JSON.stringify(gluco);
    return await this.core.interactions.create(this.prompt);
  }
}
