export async function GET() {
  const { data, error } = await supabase.from('flight_deals').select('*')
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return Response.json(data)
}
