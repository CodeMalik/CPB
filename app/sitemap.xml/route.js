import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  const baseUrl = 'https://custompackboxes.com';
  
  try {
    console.log('🔄 Generating FRESH sitemap...');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is missing');
    }

    const client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    
    await client.connect();
    const db = client.db('custom-pack-boxes');

    // Get ALL active products (include new ones)
    const products = await db.collection('products')
      .find({ 
        $or: [
          { status: { $exists: false } }, // Products without status field
          { status: { $ne: 'deleted' } }, // Products not deleted
          { status: 'active' }, // Active products
          { isActive: true } // Active products
        ]
      })
      .project({ slug: 1, updatedAt: 1, createdAt: 1, title: 1 })
      .sort({ createdAt: -1 })
      .toArray();

    // Get ALL active categories
    const categories = await db.collection('categories')
      .find({ 
        $or: [
          { status: { $exists: false } }, // Categories without status field
          { status: { $ne: 'deleted' } }, // Categories not deleted
          { status: 'active' }, // Active categories
          { isActive: true } // Active categories
        ]
      })
      .project({ slug: 1, updatedAt: 1, createdAt: 1, name: 1 })
      .sort({ createdAt: -1 })
      .toArray();

    await client.close();

    console.log(`📊 Sitemap data: ${products.length} products, ${categories.length} categories`);

    // Generate XML with CURRENT data
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/our-recent-boxes</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/search</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- REAL PRODUCTS - Updated: ${new Date().toISOString()} -->
  ${products.map(product => {
    const lastmod = product.updatedAt ? new Date(product.updatedAt).toISOString() : 
                   product.createdAt ? new Date(product.createdAt).toISOString() : 
                   new Date().toISOString();
    return `
  <url>
    <loc>${baseUrl}/custom-packaging/${product.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  }).join('')}

  <!-- REAL CATEGORIES - Updated: ${new Date().toISOString()} -->
  ${categories.map(category => {
    const lastmod = category.updatedAt ? new Date(category.updatedAt).toISOString() : 
                   category.createdAt ? new Date(category.createdAt).toISOString() : 
                   new Date().toISOString();
    return `
  <url>
    <loc>${baseUrl}/customized/${category.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  }).join('')}
</urlset>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        // 🎯 NO CACHE - Immediate updates
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

  } catch (error) {
    console.error('❌ Sitemap error:', error);
    
    // Fallback with no cache
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.8</priority>
  </url>
  <!-- ERROR: ${error.message} -->
</urlset>`;

    return new NextResponse(fallbackXml, {
      headers: { 
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }
}