// import { OpenAI } from "openai";
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../constants";
import { FromLanguage, Language } from "../types.d";

export async function translate({
  fromLanguage,
  toLanguage,
  text,
}: {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  text: string;
}) {
  const fromCode =
    fromLanguage === "auto" ? "auto" : SUPPORTED_LANGUAGES[fromLanguage];
  const toCode = SUPPORTED_LANGUAGES[toLanguage];

  // Helsinki-NLP/opus-mt para traducción
  const modelName = `Helsinki-NLP/opus-mt-${fromCode}-${toCode}`;
  const API_URL = `https://api-inference.huggingface.co/models/${modelName}`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_TRANSLATE_API_KEY}`,
      },
      body: JSON.stringify({ inputs: text }),
    });

    const result = await response.json();
    const translatedText = result[0]?.translation_text || "";

    return {
      translatedText,
      originalMessages: { role: "user", content: text },
      fullResponse: result,
    };
  } catch (error) {
    console.error("Error en la traducción:", error);
    return null;
  }
}
