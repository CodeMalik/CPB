import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  const baseUrl = 'https://custompackboxes.com';
  
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is missing');
    }

    const client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    
    await client.connect();
    const db = client.db('custom-pack-boxes');

    // Get ONLY active products (exclude deleted/disabled)
    const products = await db.collection('products')
      .find({ 
        status: { $ne: 'deleted' }, // Exclude deleted products
        isActive: { $ne: false }    // Exclude inactive products
      })
      .project({ slug: 1, updatedAt: 1, createdAt: 1 })
      .toArray();

    // Get ONLY active categories
    const categories = await db.collection('categories')
      .find({ 
        status: { $ne: 'deleted' }, // Exclude deleted categories
        isActive: { $ne: false }    // Exclude inactive categories
      })
      .project({ slug: 1, updatedAt: 1, createdAt: 1 })
      .toArray();

    await client.close();

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

  <!-- ACTIVE PRODUCTS ONLY -->
  ${products.map(product => {
    const lastmod = product.updatedAt ? new Date(product.updatedAt).toISOString() : 
                   new Date().toISOString();
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
        // 🎯 REDUCE CACHE TIME for faster updates
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // 5 minutes cache
      },
    });

  } catch (error) {
    console.error('Sitemap error:', error);
    
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}</loc><priority>1.0</priority></url>
</urlset>`;

    return new NextResponse(fallbackXml, {
      headers: { 'Content-Type': 'application/xml' },
    });
  }
}