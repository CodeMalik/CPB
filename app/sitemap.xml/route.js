import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  const baseUrl = 'https://custompackboxes.com';
  const requestTime = new Date().toISOString();
  
  try {
    console.log(`🔄 [${requestTime}] Generating FRESH sitemap...`);
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is missing');
    }

    const client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    
    await client.connect();
    const db = client.db('custom-pack-boxes');

    // 🎯 CORRECTED QUERY - Only get ACTIVE products
    const products = await db.collection('products')
      .find({ 
        // Only include products that are NOT deleted AND are active
        $and: [
          { 
            $or: [
              { status: { $exists: false } }, // No status field = include
              { status: { $ne: 'deleted' } }, // Status not 'deleted' = include
              { status: 'active' } // Status is 'active' = include
            ]
          },
          {
            $or: [
              { isActive: { $exists: false } }, // No isActive field = include
              { isActive: true }, // isActive is true = include
              { isActive: { $ne: false } } // isActive not false = include
            ]
          }
        ]
      })
      .project({ slug: 1, updatedAt: 1, createdAt: 1, title: 1, status: 1, isActive: 1 })
      .sort({ updatedAt: -1 })
      .toArray();

    // 🎯 CORRECTED QUERY - Only get ACTIVE categories
    const categories = await db.collection('categories')
      .find({ 
        $and: [
          { 
            $or: [
              { status: { $exists: false } },
              { status: { $ne: 'deleted' } },
              { status: 'active' }
            ]
          },
          {
            $or: [
              { isActive: { $exists: false } },
              { isActive: true },
              { isActive: { $ne: false } }
            ]
          }
        ]
      })
      .project({ slug: 1, updatedAt: 1, createdAt: 1, name: 1, status: 1, isActive: 1 })
      .sort({ updatedAt: -1 })
      .toArray();

    await client.close();

    console.log(`📊 [${requestTime}] Active products: ${products.length}`);
    console.log(`📊 [${requestTime}] Active categories: ${categories.length}`);
    
    // 🎯 DEBUG: Show sample of what's included
    if (products.length > 0) {
      console.log('📦 Sample active products:', products.slice(0, 3).map(p => ({
        slug: p.slug,
        status: p.status,
        isActive: p.isActive,
        updatedAt: p.updatedAt
      })));
    }

    // Generate XML with CORRECT data
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Generated: ${requestTime} -->
  <!-- Active Products: ${products.length}, Active Categories: ${categories.length} -->
  
  <!-- Static Pages -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${requestTime}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${requestTime}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${requestTime}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/our-recent-boxes</loc>
    <lastmod>${requestTime}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/search</loc>
    <lastmod>${requestTime}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- ACTIVE PRODUCTS ONLY -->
  ${products.map(product => {
    // 🎯 USE REAL updatedAt timestamp, not fallback
    const lastmod = product.updatedAt ? new Date(product.updatedAt).toISOString() : 
                   product.createdAt ? new Date(product.createdAt).toISOString() : 
                   requestTime;
    return `
  <url>
    <loc>${baseUrl}/custom-packaging/${product.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  }).join('')}

  <!-- ACTIVE CATEGORIES ONLY -->
  ${categories.map(category => {
    const lastmod = category.updatedAt ? new Date(category.updatedAt).toISOString() : 
                   category.createdAt ? new Date(category.createdAt).toISOString() : 
                   requestTime;
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
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

  } catch (error) {
    console.error(`❌ [${requestTime}] Sitemap error:`, error);
    
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- ERROR at ${requestTime}: ${error.message} -->
  <url>
    <loc>${baseUrl}</loc>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new NextResponse(fallbackXml, {
      headers: { 
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }
}