/** @type {import('next-sitemap').IConfig} */
const { MongoClient } = require('mongodb')

const config = {
  siteUrl: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://custompackboxes.com',
  generateRobotsTxt: true,
  sitemapSize: 10000,
  generateIndexSitemap: false,

  exclude: [
    '/api/*',
    '/_not-found',
    '/thank-you',
    '/admin/*',
    '/custom-packaging/*', // We'll handle these manually to avoid duplicates
    '/customized/*', // We'll handle these manually to avoid duplicates
  ],

  // 🎯 Transform function to fix automatic URL generation
  transform: async (config, path) => {
    // Skip API routes and excluded paths
    if (path.startsWith('/api/') || path === '/thank-you' || path === '/_not-found') {
      return null
    }

    // 🎯 FIX: Home page - set priority to 1.0
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 1.0, // Changed from 1 to 1.0
        lastmod: new Date().toISOString(),
      }
    }

    // 🎯 FIX: Convert direct product URLs to /custom-packaging/ format
    if (path.includes('-boxes') && !path.startsWith('/custom-packaging/') && !path.startsWith('/customized/')) {
      // Check if this is a product page (has "custom-" prefix in most cases)
      if (path.includes('/custom-') || path === '/candle-boxes' || path === '/apparel-boxes' || path === '/bakery-and-cake-boxes') {
        // This is likely a product page that should be under /custom-packaging/
        const slug = path.replace('/', '')
        return {
          loc: `/custom-packaging/${slug}`,
          changefreq: 'weekly',
          priority: 0.9, // Changed from 0.8 to 0.9
          lastmod: new Date().toISOString(),
        }
      }
    }

    // 🎯 Handle static pages
    const staticPages = {
      '/': 1.0, // Already handled above, but keeping for reference
      '/about': 0.8,
      '/contact': 0.8,
      '/our-recent-boxes': 0.9,
      '/search': 0.6,
      '/privacy-policy': 0.3,
      '/terms-and-conditions': 0.3,
    }

    if (staticPages[path] !== undefined) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: staticPages[path],
        lastmod: new Date().toISOString(),
      }
    }

    // 🎯 For all other pages, use default settings but skip if they look like products/categories
    if (path.includes('-boxes') && !path.startsWith('/custom-packaging/') && !path.startsWith('/customized/')) {
      return null // Skip direct product/category URLs
    }

    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }
  },

  // 🎯 Additional paths from MongoDB
  additionalPaths: async (config) => {
    const result = []

    // 🎯 FIX: Add home page explicitly with priority 1.0
    result.push({
      loc: '/',
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    })

    // Get dynamic URLs from MongoDB
    if (!process.env.MONGODB_URI) {
      console.log('📝 MONGODB_URI not found')
      return result
    }

    let client
    try {
      console.log('🔗 Connecting to MongoDB...')
      client = await MongoClient.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
      })

      const db = client.db('custom-pack-boxes')
      console.log('✅ Connected to MongoDB successfully!')

      // 🎯 1. Get products - generate /custom-packaging/ URLs
      console.log('🔄 Looking for products...')
      const collections = await db.listCollections().toArray()
      const collectionNames = collections.map(c => c.name)

      const productCollections = ['products', 'product', 'items', 'boxes']
      for (const collName of productCollections) {
        if (collectionNames.includes(collName)) {
          console.log(`🔄 Reading ${collName} collection...`)
          const products = await db.collection(collName)
            .find({})
            .limit(1000)
            .toArray()

          console.log(`📦 Found ${products.length} products in ${collName}`)

          products.forEach(product => {
            const slug = product.slug || product.identifier || product.name || product.title
            if (slug) {
              // 🎯 Generate /custom-packaging/ URLs for products with priority 0.9
              result.push({
                loc: `/custom-packaging/${slug}`,
                lastmod: product.updatedAt ? new Date(product.updatedAt).toISOString() :
                        product.createdAt ? new Date(product.createdAt).toISOString() :
                        new Date().toISOString(),
                changefreq: 'weekly',
                priority: 0.9, // Changed from 0.8 to 0.9
              })
            }
          })
          break
        }
      }

      // 🎯 2. Get categories - generate /customized/ URLs
      const categoryCollections = ['categories', 'category', 'collections']
      for (const collName of categoryCollections) {
        if (collectionNames.includes(collName)) {
          console.log(`🔄 Reading ${collName} collection...`)
          const categories = await db.collection(collName)
            .find({})
            .limit(500)
            .toArray()

          console.log(`📂 Found ${categories.length} categories in ${collName}`)

          categories.forEach(category => {
            const slug = category.slug || category.identifier || category.name || category.title
            if (slug) {
              // 🎯 Generate /customized/ URLs for categories with priority 0.9
              result.push({
                loc: `/customized/${slug}`,
                lastmod: category.updatedAt ? new Date(category.updatedAt).toISOString() :
                        category.createdAt ? new Date(category.createdAt).toISOString() :
                        new Date().toISOString(),
                changefreq: 'weekly',
                priority: 0.9, // Changed from 0.8 to 0.9
              })
            }
          })
          break
        }
      }

      console.log(`🎯 Total dynamic URLs generated: ${result.length}`)

    } catch (error) {
      console.log('❌ MongoDB failed:', error.message)
    } finally {
      if (client) {
        await client.close()
        console.log('🔌 MongoDB connection closed')
      }
    }

    return result
  },
}
