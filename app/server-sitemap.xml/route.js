import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

export async function GET() {
  const baseUrl = process.env.SITE_URL || 'https://custompackboxes.com'
  
  try {
    console.log('🔄 Generating dynamic sitemap...')
    
    // Connect to MongoDB - RUNS ON EVERY REQUEST
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db('custom-pack-boxes')
    
    // Get CURRENT products (always fresh data)
    const products = await db.collection('products')
      .find({ status: { $ne: 'draft' } })
      .project({ slug: 1, updatedAt: 1, createdAt: 1, title: 1 })
      .sort({ updatedAt: -1 })
      .limit(2000)
      .toArray()

    // Get CURRENT categories (always fresh data)
    const categories = await db.collection('categories')
      .find({})
      .project({ slug: 1, updatedAt: 1, createdAt: 1, name: 1 })
      .sort({ updatedAt: -1 })
      .limit(500)
      .toArray()

    await client.close()

    console.log(`📊 Sitemap data: ${products.length} products, ${categories.length} categories`)

    // Generate XML with CURRENT data
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>${baseUrl}</loc>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/our-recent-boxes</loc>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/search</loc>
    <priority>0.6</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/privacy-policy</loc>
    <priority>0.3</priority>
    <changefreq>yearly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/terms-and-conditions</loc>
    <priority>0.3</priority>
    <changefreq>yearly</changefreq>
  </url>
  
  <!-- Dynamic Products - ALWAYS CURRENT DATA -->
  ${products.map(product => {
    const lastmod = product.updatedAt ? new Date(product.updatedAt).toISOString() : 
                   product.createdAt ? new Date(product.createdAt).toISOString() : 
                   new Date().toISOString()
    return `
  <url>
    <loc>${baseUrl}/custom-packaging/${product.slug}</loc>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
    <lastmod>${lastmod}</lastmod>
  </url>`
  }).join('')}
  
  <!-- Dynamic Categories - ALWAYS CURRENT DATA -->
  ${categories.map(category => {
    const lastmod = category.updatedAt ? new Date(category.updatedAt).toISOString() : 
                   category.createdAt ? new Date(category.createdAt).toISOString() : 
                   new Date().toISOString()
    return `
  <url>
    <loc>${baseUrl}/customized/${category.slug}</loc>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
    <lastmod>${lastmod}</lastmod>
  </url>`
  }).join('')}
</urlset>`

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })

  } catch (error) {
    console.error('❌ Error generating dynamic sitemap:', error)
    
    // Fallback to basic sitemap if MongoDB fails
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
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
  <url>
    <loc>${baseUrl}/contact</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/our-recent-boxes</loc>
    <priority>0.9</priority>
  </url>
</urlset>`
    
    return new NextResponse(fallbackXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
}