import { NextResponse } from 'next/server'

export function GET() {
  const baseUrl = process.env.SITE_URL || 'https://custompackboxes.com'
  
  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /thank-you

# Dynamic sitemap - always up to date
Sitemap: ${baseUrl}/sitemap.xml`

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=86400',
    },
  })
}