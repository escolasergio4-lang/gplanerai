import { ApiConfig } from '../types';
import { GoogleGenAI } from "@google/genai";
import { MASTER_PROMPT } from '../constants';

export const generateContent = async (
  apiConfig: ApiConfig,
  userPrompt: string
): Promise<string> => {
  const fullPrompt = `${MASTER_PROMPT}\n\n${userPrompt}`;

  try {
    if (apiConfig.provider === 'gemini') {
      const modelName = apiConfig.model || "gemini-1.5-flash"; // Fallback to 1.5 flash if unspecified
      
      // Initialize SDK with the user's key
      const ai = new GoogleGenAI({ apiKey: apiConfig.key });
      
      const response = await ai.models.generateContent({
        model: modelName,
        contents: [
            {
                role: 'user',
                parts: [{ text: fullPrompt }]
            }
        ]
      });

      return response.text || "Sem resposta da IA.";

    } else if (apiConfig.provider === 'groq') {
      const model = apiConfig.model || "llama-3.3-70b-versatile";
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiConfig.key}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: MASTER_PROMPT },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.7
        })
      });
      const d = await res.json();
      if (d.error) throw new Error(d.error.message);
      return d.choices[0].message.content;

    } else if (apiConfig.provider === 'openai') {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiConfig.key}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: MASTER_PROMPT },
            { role: "user", content: userPrompt }
          ]
        })
      });
      const d = await res.json();
      if (d.error) throw new Error(d.error.message);
      return d.choices[0].message.content;

    } else if (apiConfig.provider === 'deepseek') {
        const res = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiConfig.key}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    { role: "system", content: MASTER_PROMPT },
                    { role: "user", content: userPrompt }
                ]
            })
        });
        const d = await res.json();
        if (d.error) throw new Error(d.error.message);
        return d.choices[0].message.content;

    } else if (apiConfig.provider === 'anthropic') {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiConfig.key,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20240620",
          max_tokens: 4000,
          system: MASTER_PROMPT,
          messages: [{ role: "user", content: userPrompt }]
        })
      });
      const d = await res.json();
      if (d.error) throw new Error(d.error.message);
      return d.content[0].text;

    } else if (apiConfig.provider === 'openrouter') {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiConfig.key}`,
          'HTTP-Referer': window.location.href
        },
        body: JSON.stringify({
          model: apiConfig.model || "anthropic/claude-3.5-sonnet",
          messages: [
            { role: "system", content: MASTER_PROMPT },
            { role: "user", content: userPrompt }
          ]
        })
      });
      const d = await res.json();
      if (d.error) throw new Error(d.error.message);
      return d.choices[0].message.content;
    }

    throw new Error("Provedor de IA desconhecido");
  } catch (error: any) {
    throw new Error(error.message || "Erro desconhecido na geração");
  }
};
