/** @type {import('next-sitemap').IConfig} */
const { MongoClient } = require('mongodb')

const config = {
  siteUrl: process.env.SITE_URL || 'https://custompackboxes.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  
  exclude: [
    '/api/*',
    '/_not-found', 
    '/thank-you', 
    '/admin/*',
    '/server-sitemap.xml',
  ],

  transform: async (config, path) => {
    if (path.startsWith('/api/') || path === '/thank-you' || path === '/_not-found') {
      return null
    }

    // Static pages configuration
    const staticPages = {
      '/': { priority: 1.0, changefreq: 'daily' },
      '/about': { priority: 0.8, changefreq: 'monthly' },
      '/contact': { priority: 0.8, changefreq: 'monthly' },
      '/our-recent-boxes': { priority: 0.9, changefreq: 'weekly' },
      '/search': { priority: 0.6, changefreq: 'monthly' },
      '/privacy-policy': { priority: 0.3, changefreq: 'yearly' },
      '/terms-and-conditions': { priority: 0.3, changefreq: 'yearly' },
    }

    if (staticPages[path]) {
      return {
        loc: path,
        changefreq: staticPages[path].changefreq,
        priority: staticPages[path].priority,
        lastmod: new Date().toISOString(),
      }
    }

    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }
  },

  additionalPaths: async (config) => {
    const result = []

    // Always include static pages
    const staticPages = [
      { loc: '/', priority: 1.0, changefreq: 'daily' },
      { loc: '/about', priority: 0.8, changefreq: 'monthly' },
      { loc: '/contact', priority: 0.8, changefreq: 'monthly' },
      { loc: '/our-recent-boxes', priority: 0.9, changefreq: 'weekly' },
      { loc: '/search', priority: 0.6, changefreq: 'monthly' },
      { loc: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
      { loc: '/terms-and-conditions', priority: 0.3, changefreq: 'yearly' },
    ]

    staticPages.forEach(page => {
      result.push({
        ...page,
        lastmod: new Date().toISOString(),
      })
    })

    // Add dynamic products and categories from MongoDB
    if (!process.env.MONGODB_URI) {
      console.log('❌ MONGODB_URI not found - skipping dynamic URLs')
      return result
    }
    
    let client
    try {
      console.log('🔗 Connecting to MongoDB for sitemap...')
      client = await MongoClient.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
        maxPoolSize: 10,
      })
      
      const db = client.db('custom-pack-boxes')
      console.log('✅ Connected to MongoDB successfully!')
      
      // Get products
      const products = await db.collection('products')
        .find({ status: { $ne: 'draft' } }) // Exclude drafts
        .project({ slug: 1, updatedAt: 1, createdAt: 1 })
        .limit(2000)
        .toArray()
      
      console.log(`📦 Found ${products.length} products for sitemap`)
      
      products.forEach(product => {
        if (product.slug) {
          result.push({
            loc: `/custom-packaging/${product.slug}`,
            lastmod: product.updatedAt ? new Date(product.updatedAt).toISOString() : 
                    product.createdAt ? new Date(product.createdAt).toISOString() : 
                    new Date().toISOString(),
            changefreq: 'weekly',
            priority: 0.9,
          })
        }
      })

      // Get categories
      const categories = await db.collection('categories')
        .find({})
        .project({ slug: 1, updatedAt: 1, createdAt: 1 })
        .limit(500)
        .toArray()
      
      console.log(`📂 Found ${categories.length} categories for sitemap`)
      
      categories.forEach(category => {
        if (category.slug) {
          result.push({
            loc: `/customized/${category.slug}`,
            lastmod: category.updatedAt ? new Date(category.updatedAt).toISOString() : 
                    category.createdAt ? new Date(category.createdAt).toISOString() : 
                    new Date().toISOString(),
            changefreq: 'weekly',
            priority: 0.9,
          })
        }
      })
      
      console.log(`🎯 Total URLs in sitemap: ${result.length}`)
      
    } catch (error) {
      console.log('❌ MongoDB connection failed:', error.message)
      // Don't throw error, just return static pages
    } finally {
      if (client) {
        await client.close()
      }
    }

    return result
  },

  // Add robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/thank-you'],
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://custompackboxes.com'}/server-sitemap.xml`,
    ],
  },
}

module.exports = config