import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://custompackboxes.com'
  
  // Simple static sitemap for testing
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>2025-11-03T09:00:00.000Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>2025-11-03T09:00:00.000Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>2025-11-03T09:00:00.000Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/our-recent-boxes</loc>
    <lastmod>2025-11-03T09:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/custom-packaging/test-product</loc>
    <lastmod>2025-11-03T09:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}