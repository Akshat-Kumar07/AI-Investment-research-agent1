import { StateGraph, Annotation, START, END } from "@langchain/langgraph";
import { getTicker } from "@/lib/ticker";
import { getStockData } from "@/lib/finance";
import { client } from "@/lib/tavily";
import { GoogleGenAI } from "@google/genai";

const GraphState = Annotation.Root({
  company: Annotation(),
  ticker: Annotation(),
  financials: Annotation(),
  news: Annotation(),

  verdict: Annotation(),
  confidence: Annotation(),
  pros: Annotation(),
  cons: Annotation(),
  summary: Annotation(),
});

export const state = GraphState;

async function tickerNode(state) {
  const ticker = await getTicker(state.company);
  // const ticker = "TSLA";

  return {
    ticker,
  };
}

async function financeNode(state) {
  const financials = await getStockData(state.ticker);

  return {
    financials,
  };
}

async function newsNode(state) {
  const newsData = await client.search(
    `${state.company} latest company news`
  );

  return {
    news: newsData.results,
  };
}

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function analysisNode(state) {
  const prompt = `
Analyze ${state.company} as an investment.

Financial Data:
${JSON.stringify(state.financials)}

News:
${JSON.stringify(state.news)}

Return ONLY valid JSON.

{
  "verdict": "INVEST or PASS or NEUTRAL",
  "confidence": 85,
  "pros": [
    "pro 1",
    "pro 2"
  ],
  "cons": [
    "con 1",
    "con 2"
  ],
  "summary": "short summary"
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });

  const cleanText = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const analysis = JSON.parse(cleanText);

  return {
    verdict: analysis.verdict,
    confidence: analysis.confidence,
    pros: analysis.pros,
    cons: analysis.cons,
    summary: analysis.summary,
  };
}

export const graph = new StateGraph(GraphState)
  .addNode("tickerNode", tickerNode)
  .addNode("financeNode", financeNode)
  .addNode("newsNode", newsNode)
  .addNode("analysisNode", analysisNode)

  .addEdge(START, "tickerNode")
  .addEdge("tickerNode", "financeNode")
  .addEdge("financeNode", "newsNode")
  .addEdge("newsNode", "analysisNode")
  .addEdge("analysisNode", END)

  .compile();