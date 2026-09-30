// robots.txt pointing crawlers at /sitemap.xml on whichever domain served the request
// (proxy headers first, so it's the public domain rather than the internal host).
export function GET(request: Request) {
  const url = new URL(request.url)
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? url.host
  const proto = request.headers.get('x-forwarded-proto') ?? url.protocol.replace(':', '')
  const origin = `${proto}://${host}`

  const body = [
    'User-agent: *',
    'Allow: /',
    // Personal / transactional pages — no value in search results.
    'Disallow: /book',
    'Disallow: /booking/',
    'Disallow: /search',
    '',
    `Sitemap: ${origin}/sitemap.xml`,
    '',
  ].join('\n')

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
