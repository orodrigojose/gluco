import { GoogleGenAI } from "@google/genai";
import { consumeMessages } from "./rabbit/consumer";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyze = async (gluco: any) => {
  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash",
    input: `
  ## Agente:
  Análise mensagens recebidas no formato:

  {
    source: <TELEGRAM|WHATSAPP|DISCORD>,
    message: "diabetes 220 pos almoço, comi um doce pq abaixou e não tirei o destro"
  }


  deverá análisar o message e retornar para mim seguindo este padrão, apenas o json conforme está mostrando abaixo:

  {
    source: <TELEGRAMWHATSAPP|DISCORD>,
    value: 220,
    message: "diabetes 220 pos almoçõ, comi um doce pq abaixou e não tirei o destro",
    note: "comi um doce pq abaixou e não tirei o destro",
    recomendation: <recomendação do que fazer com base na mensagem, exemplo: "passei mal, diabetes deu 440">,
    mealPeriod: <identificar o período do qual foi registrado o indice glicemico e enviar seguindo o enum BREAKFAST|LUNCH|SNACK|DINNER>
  }

  ----
  mensage recebida, me mande o retorno em json conforme a instrução acima:
  ${JSON.stringify(gluco)}
  `,
  });

  console.log(interaction.output_text);
};

consumeMessages("gluco", analyze);
