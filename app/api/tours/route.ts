import { neon } from '@/lib/neon'

export async function GET() {
  try {
    const result = await neon('SELECT * FROM tours')
    return Response.json(result)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 })
  }
}
