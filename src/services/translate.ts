import { OpenAI } from "openai";
import { SUPPORTED_LANGUAGES } from "../constants";
import { FromLanguage, Language } from "../types.d";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });


export async function translate ({
    fromLanguage,
    toLanguage,
    text
}: {
    fromLanguage: FromLanguage
    toLanguage: Language
    text: string
}) {
    const completions = await client.chat.completions.create(
        {
            model: 'gpt-4o',
            messages: [
                {
                    role: 'developer',
                    content: 'You are an AI that translates text. You receive a text from the user. Do not answer. Just translate the text. The original language is surrounded by `{{` and `}}`. You can also receive {{auto}} which means that you have to detect the language. The language you have to translate to is surrounded by `[[` and `]]`.',
                },
                {
                    role: 'user',
                    content: `Hola mundo {{Español}} [[English]]`
                },
                {
                    role: 'assistant',
                    content: 'Hello world'
                },
                {
                    role: 'user',
                    content: 'What are you doing? {{auto}} [[Deutsch]]'
                },
                {
                    role: 'assistant',
                    content: 'Was machst du?'
                },
                {
                    role: 'user',
                    content: 'Oi manito, o que você tá fazendo? {{auto}} [[Español]]'
                },
                {
                    role: 'assistant',
                    content: 'Hola hermano, ¿qué estás haciendo?'
                }
            ]
        }
    )

    const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]

    const response = await client.chat.completions.create(
        {
            model: 'gpt-4o',
            messages: [
                {
                    role: completions.choices[0].message.role,
                    content: completions.choices[0].message.content || ''
                },
                {
                    role: 'user',
                    content: `${text} {{${fromCode}}} [[${toCode}]]`
                }
            ]
        }
    )

    // Extraer la respuesta final del modelo
    const translatedText = response.choices[0]?.message.content?.trim() || ''

    // Devolver los mensajes de primera llamada y la respuesta final
    return {
        translatedText,
        originalMessages: completions.choices[0].message,
        fullResponse: response
    }
}
