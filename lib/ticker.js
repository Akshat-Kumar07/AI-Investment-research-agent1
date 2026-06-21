import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function getTicker(company) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
Return ONLY the stock ticker symbol for:

${company}

Examples:
Tesla -> TSLA
Apple -> AAPL
Nvidia -> NVDA

Return only the ticker.
`,
  });

  return response.text.trim();
}