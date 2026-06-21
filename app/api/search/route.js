import { client } from "@/lib/tavily";

export async function GET() {
  try {
    const response = await client.search("Tesla latest news");

    return Response.json({
      success: true,
      data: response,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}