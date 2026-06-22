import { graph } from "@/lib/graph";

export async function POST(req) {
  try {
    const { company } = await req.json();

    console.log("COMPANY:", company);

    const result = await graph.invoke({
      company,
    });

    console.log("GRAPH RESULT:", result);

    return Response.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("ANALYZE ERROR:", error);

    return Response.json({
      success: false,
      error: error.message,
      stack: error.stack,
    });
  }
}