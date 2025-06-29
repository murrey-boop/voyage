import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const data = await sql`SELECT * FROM visaPromos`;
    return Response.json(data);
  } catch (error: unknown) {
    const errorMessage = (error instanceof Error) ? error.message : String(error);
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}
