import GeminiAi from "./ai/gemini";
import { consumeMessages } from "./rabbit/consumer";
import GlicoService from "./services/glico.service";

const geminiAi = new GeminiAi();
const glicoService = new GlicoService();

const analyze = async (gluco: any) => {
  const interaction = await geminiAi.interact(gluco);
  const data = await glicoService.register(interaction.output_text); 
};

consumeMessages("gluco", analyze);
