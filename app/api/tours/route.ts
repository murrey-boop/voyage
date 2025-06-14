// app/api/tours/route.ts
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('tours')
    .select('*')

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  return Response.json(data)
}
