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

  let ticker = response.text.trim();

const indianTickers = {
  RELIANCE: "RELIANCE.NS",
  TCS: "TCS.NS",
  INFY: "INFY.NS",
  WIPRO: "WIPRO.NS",
  HDFCBANK: "HDFCBANK.NS",
  ICICIBANK: "ICICIBANK.NS",
  SBIN: "SBIN.NS",
  BHARTIARTL: "BHARTIARTL.NS",
  ITC: "ITC.NS",
  LT: "LT.NS",
};

return indianTickers[ticker] || ticker;
}
