import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

export async function GET() {
  try {
    const baseUrl = process.env.SITE_URL || 'https://custompackboxes.com'
    
    // Connect to MongoDB - RUNS ON EVERY REQUEST
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db('custom-pack-boxes')
    
    // Get CURRENT products (always fresh)
    const products = await db.collection('products')
      .find({ status: { $ne: 'draft' } })
      .toArray()

    // Get CURRENT categories (always fresh)
    const categories = await db.collection('categories')
      .find({})
      .toArray()

    await client.close()

    // Generate XML with CURRENT data
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <priority>0.8</priority>
  </url>
  <!-- Add all your static pages -->
  
  <!-- DYNAMIC PRODUCTS - ALWAYS CURRENT -->
  ${products.map(product => `
  <url>
    <loc>${baseUrl}/custom-packaging/${product.slug}</loc>
    <priority>0.9</priority>
    <lastmod>${(product.updatedAt || new Date()).toISOString()}</lastmod>
  </url>
  `).join('')}
  
  <!-- DYNAMIC CATEGORIES - ALWAYS CURRENT -->
  ${categories.map(category => `
  <url>
    <loc>${baseUrl}/customized/${category.slug}</loc>
    <priority>0.9</priority>
    <lastmod>${(category.updatedAt || new Date()).toISOString()}</lastmod>
  </url>
  `).join('')}
</urlset>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    // Fallback XML
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}</loc></url>
</urlset>`
    return new NextResponse(fallback, { headers: {'Content-Type': 'application/xml'} })
  }
}