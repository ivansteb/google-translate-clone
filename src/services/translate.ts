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




}
