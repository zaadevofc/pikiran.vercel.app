export async function GET() {
  const api = 'https://api.github.com/repos/zaadevofc/pikiran.vercel.app/issues/1/comments';
  const options = { headers: { Authorization: `Bearer ${import.meta.env.GH_TOKEN}` } };

  let fetching = await fetch(api, options)
  if (!fetching.ok) return new Response(
    JSON.stringify({ ok: fetching.ok, status: fetching.status }), { status: fetching.status, headers: { "Content-Type": "application/json" } }
  );

  let data = await fetching.json()

  data = data.map(x => {
    return {
      quotes: x.body.replace(/"/g, '').trim(),
      quotes_url: x.html_url,
      author: x.user.login,
      created_at: x.created_at,
      updated_at: x.updated_at,
    }
  }).reverse()

  return new Response(
    JSON.stringify({ ok: fetching.ok, status: fetching.status, data }), { status: fetching.status, headers: { "Content-Type": "application/json" } }
  );
}