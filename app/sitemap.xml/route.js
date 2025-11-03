import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  const baseUrl = 'https://custompackboxes.com';
  
  try {
    console.log('🔄 Starting sitemap generation...');
    
    // Check if MongoDB URI exists
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is missing');
    }

    console.log('🔗 Connecting to MongoDB...');
    const client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('custom-pack-boxes');

    // Get products
    console.log('📦 Fetching products...');
    const products = await db.collection('products')
      .find({})
      .project({ slug: 1, updatedAt: 1, createdAt: 1, title: 1 })
      .toArray();
    console.log(`📦 Found ${products.length} products`);

    // Get categories
    console.log('📂 Fetching categories...');
    const categories = await db.collection('categories')
      .find({})
      .project({ slug: 1, updatedAt: 1, createdAt: 1, name: 1 })
      .toArray();
    console.log(`📂 Found ${categories.length} categories`);

    await client.close();

    // Generate XML with REAL data
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

  <!-- REAL PRODUCTS -->
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

  <!-- REAL CATEGORIES -->
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

    console.log(`🎯 Generated sitemap with ${products.length} products and ${categories.length} categories`);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600',
      },
    });

  } catch (error) {
    console.error('❌ SITEMAP ERROR:', error.message);
    
    // Return error details in the sitemap for debugging
    const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://custompackboxes.com</loc>
    <priority>1.0</priority>
  </url>
  <!-- ERROR: ${error.message} -->
  <url>
    <loc>https://custompackboxes.com/about</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://custompackboxes.com/contact</loc>
    <priority>0.8</priority>
  </url>
</urlset>`;

    return new NextResponse(errorXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}