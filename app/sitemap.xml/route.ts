// Serves the backend-generated sitemap (managed in the admin) at /sitemap.xml on this site.
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://breeter.phitanydev.in/api/'

export async function GET() {
  try {
    // Same 1-minute freshness as the page SEO data, so admin changes show up quickly.
    const res = await fetch(`${API_BASE}v1/sitemap.xml`, { next: { revalidate: 60 } })
    if (!res.ok) throw new Error(`Sitemap API responded ${res.status}`)
    const xml = await res.text()
    return new Response(xml, {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    })
  } catch {
    // 503 (not an empty sitemap) so search engines retry later instead of dropping every URL.
    return new Response('Sitemap temporarily unavailable', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Retry-After': '3600' },
    })
  }
}
