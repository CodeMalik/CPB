/** @type {import('next-sitemap').IConfig} */
const { MongoClient } = require('mongodb')

const config = {
  siteUrl: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : 'https://custompackboxes.com',
  generateRobotsTxt: true,
  sitemapSize: 10000, // 🎯 Increase size to prevent splitting
  generateIndexSitemap: false, // 🎯 Disable multiple sitemap files
  
  exclude: ['/api/*', '/_not-found', '/thank-you', '/admin/*'],

  // 🎯 Read from your actual MongoDB collections
  additionalPaths: async (config) => {
    if (!process.env.MONGODB_URI) {
      console.log('📝 MONGODB_URI not found')
      return getStaticUrls()
    }
    
    let client
    try {
      console.log('🔗 Connecting to MongoDB...')
      client = await MongoClient.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
      })
      
      const db = client.db('custom-pack-boxes')
      console.log('✅ Connected to MongoDB successfully!')
      
      const result = []
      
      // 🎯 1. Read from 'metas' collection for pages
      console.log('🔄 Reading metas collection...')
      const metas = await db.collection('metas')
        .find({})
        .limit(500)
        .toArray()
      
      console.log(`📄 Found ${metas.length} meta documents`)
      
      metas.forEach(meta => {
        if (meta.identifier) {
          const urlMap = {
            'about-us': '/about',
            'home': '/',
            'contact-us': '/contact',
            'privacy-policy': '/privacy-policy',
            'terms-and-conditions': '/terms-and-conditions',
            'our-recent-boxes': '/our-recent-boxes',
            'search': '/search'
          }
          
          const url = urlMap[meta.identifier] || `/${meta.identifier}`
          if (url !== '/') {
            result.push({
              loc: url,
              lastmod: meta.updatedAt ? new Date(meta.updatedAt).toISOString() : 
                      meta.createdAt ? new Date(meta.createdAt).toISOString() : 
                      new Date().toISOString(),
              changefreq: 'weekly',
              priority: url === '/about' || url === '/contact' ? 0.8 : 0.7,
            })
          }
        }
      })

      // 🎯 2. Look for products collection
      console.log('🔄 Looking for products...')
      const collections = await db.listCollections().toArray()
      const collectionNames = collections.map(c => c.name)
      console.log('📚 All collections:', collectionNames)
      
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
              result.push({
                loc: `/custom-packaging/${slug}`,
                lastmod: product.updatedAt ? new Date(product.updatedAt).toISOString() : 
                        product.createdAt ? new Date(product.createdAt).toISOString() : 
                        new Date().toISOString(),
                changefreq: 'weekly',
                priority: 0.9,
              })
            }
          })
          break
        }
      }

      // 🎯 3. Look for categories collection
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
              result.push({
                loc: `/customized/${slug}`,
                lastmod: category.updatedAt ? new Date(category.updatedAt).toISOString() : 
                        category.createdAt ? new Date(category.createdAt).toISOString() : 
                        new Date().toISOString(),
                changefreq: 'weekly',
                priority: 0.8,
              })
            }
          })
          break
        }
      }
      
      console.log(`🎯 Total URLs generated: ${result.length}`)
      return result
      
    } catch (error) {
      console.log('❌ MongoDB failed:', error.message)
      return getStaticUrls()
    } finally {
      if (client) {
        await client.close()
        console.log('🔌 MongoDB connection closed')
      }
    }
  },

  // 🎯 Transform function for static pages
  transform: async (config, path) => {
    if (path.startsWith('/api/') || path === '/thank-you' || path === '/_not-found') {
      return null
    }

    const priorities = {
      '/': 1.0,
      '/about': 0.8,
      '/contact': 0.8,
      '/our-recent-boxes': 0.9,
      '/search': 0.6,
      '/privacy-policy': 0.3,
      '/terms-and-conditions': 0.3,
    }

    return {
      loc: path,
      changefreq: 'weekly',
      priority: priorities[path] || 0.7,
      lastmod: new Date().toISOString(),
    }
  },
}

// 🎯 Static URLs as fallback
function getStaticUrls() {
  return [
    {
      loc: '/custom-packaging/custom-boxes',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: '/custom-packaging/mailer-boxes', 
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: '/customized/apparel-boxes',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    }
  ]
}

module.exports = config