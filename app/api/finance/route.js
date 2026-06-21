import { getStockData } from "@/lib/finance";

export async function GET() {
  const data = await getStockData("TSLA");

  return Response.json(data);
}