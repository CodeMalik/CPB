import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// 🎯 ADD THIS: Force dynamic rendering (no caching at framework level)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  const baseUrl = 'https://custompackboxes.com';
  const requestTime = new Date().toISOString();
  
  // 🎯 ADD CACHE BUSTING from URL parameters
  const url = new URL(request.url);
  const timestamp = url.searchParams.get('t') || Date.now();
  
  try {
    console.log(`🚀 [${requestTime}] DYNAMIC SITEMAP - Fresh MongoDB fetch...`);
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is missing');
    }

    // 🎯 SIMPLIFIED QUERY - Get everything first, then filter in code
    const client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Faster timeout
      maxPoolSize: 1,
    });
    
    await client.connect();
    const db = client.db('custom-pack-boxes');

    // 🎯 GET ALL DATA FIRST (faster query)
    const [allProducts, allCategories] = await Promise.all([
      db.collection('products')
        .find({})
        .project({ slug: 1, updatedAt: 1, createdAt: 1, title: 1, status: 1, isActive: 1 })
        .sort({ updatedAt: -1 })
        .toArray(),
      
      db.collection('categories')
        .find({})
        .project({ slug: 1, updatedAt: 1, createdAt: 1, name: 1, status: 1, isActive: 1 })
        .sort({ updatedAt: -1 })
        .toArray()
    ]);

    await client.close();

    // 🎯 FILTER IN CODE (more reliable than complex MongoDB queries)
    const activeProducts = allProducts.filter(product => {
      const status = product.status || 'active';
      const isActive = product.isActive !== false; // Default to true if not set
      
      return status !== 'deleted' && isActive;
    });

    const activeCategories = allCategories.filter(category => {
      const status = category.status || 'active';
      const isActive = category.isActive !== false;
      
      return status !== 'deleted' && isActive;
    });

    console.log(`📊 [${requestTime}] Total: ${allProducts.length} products → Active: ${activeProducts.length}`);
    console.log(`📊 [${requestTime}] Total: ${allCategories.length} categories → Active: ${activeCategories.length}`);
    
    // 🎯 DEBUG: Show what was filtered out
    if (allProducts.length !== activeProducts.length) {
      const deletedProducts = allProducts.filter(p => 
        p.status === 'deleted' || p.isActive === false
      );
      console.log(`🗑️  Filtered out ${deletedProducts.length} inactive/deleted products`);
    }

    // Generate XML with FRESH data
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 🚀 DYNAMIC SITEMAP - Generated: ${requestTime} -->
  <!-- Cache Bust: ${timestamp} -->
  <!-- Products: ${activeProducts.length}/${allProducts.length}, Categories: ${activeCategories.length}/${allCategories.length} -->
  
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

  <!-- ACTIVE PRODUCTS (Live from MongoDB) -->
  ${activeProducts.map(product => {
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

  <!-- ACTIVE CATEGORIES (Live from MongoDB) -->
  ${activeCategories.map(category => {
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

    console.log(`✅ [${requestTime}] Sitemap generated successfully`);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        // 🎯 AGGRESSIVE NO-CACHE HEADERS
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'CDN-Cache-Control': 'no-cache',
        'Vercel-CDN-Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error(`❌ [${requestTime}] Sitemap error:`, error.message);
    
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- ERROR at ${requestTime}: ${error.message} -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${requestTime}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${requestTime}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${requestTime}</lastmod>
    <priority>0.8</priority>
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