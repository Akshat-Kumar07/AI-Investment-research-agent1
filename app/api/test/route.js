import { GoogleGenAI } from "@google/genai";

export async function GET() {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
      Analyze Tesla stock in 5 bullet points:
      - Business
      - Growth
      - Risks
      - Competition
      - Overall outlook
      `,
    });

    return Response.json({
      success: true,
      analysis: response.text,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
