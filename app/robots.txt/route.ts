// Pre-launch: block all crawlers. Set to true just before production go-live.
const ALLOW_INDEXING = false

// robots.txt pointing crawlers at /sitemap.xml on whichever domain served the request
// (proxy headers first, so it's the public domain rather than the internal host).
export function GET(request: Request) {
  const url = new URL(request.url)
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? url.host
  const proto = request.headers.get('x-forwarded-proto') ?? url.protocol.replace(':', '')
  const origin = `${proto}://${host}`

  const rules = ALLOW_INDEXING
    ? [
        'Allow: /',
        // Personal / transactional pages — no value in search results.
        'Disallow: /book',
        'Disallow: /booking/',
        'Disallow: /search',
      ]
    : ['Disallow: /']

  const body = ['User-agent: *', ...rules, '', `Sitemap: ${origin}/sitemap.xml`, ''].join('\n')

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
