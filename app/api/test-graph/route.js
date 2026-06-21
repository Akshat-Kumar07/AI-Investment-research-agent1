import { graph } from "@/lib/graph";

export async function GET() {
  const result = await graph.invoke({
    company: "Tesla",
  });

  return Response.json(result);
}