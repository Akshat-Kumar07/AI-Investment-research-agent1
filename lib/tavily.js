import { tavily } from "tavily";

console.log("TAVILY KEY:", process.env.TAVILY_API_KEY);

export const client = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});