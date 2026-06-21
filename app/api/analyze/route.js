import { graph } from "@/lib/graph";

export async function POST(req) {
  try {
    const { company } = await req.json();

    const result = await graph.invoke({
      company,
    });

    return Response.json({
      success: true,
      ...result,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}