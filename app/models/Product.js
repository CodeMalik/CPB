import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  heading: { type: String, required: true },
  slug: {type: String, required: true, unique: true},
  categorySlug: {type: String, required: true},
   image: {
    url: String,
    alt: String,
    title: String,
    caption: String,
    description: String,
    public_id: String,
  },
  images: [
    {
    url: String,
    alt: String,
    title: String,
    caption: String,
    description: String,
    public_id: String,
  },
  ],
  tagline: String,
  shortDescription: mongoose.Schema.Types.Mixed,

  categoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],

  longDescription: String,
  meta: {
    title: String,
    description: String,
    keywords: String,
    ogImage: String,
    ogTitle: String,
    ogDescription: String,
    twitterTitle: String,
    twitterDescription: String,
    twitterImage: String,
  },
}, {
  timestamps: true
});

// ============ HELPER FUNCTIONS ============

/**
 * Extract Cloudinary ID from URL
 */
function extractCloudinaryId(url) {
  if (!url || typeof url !== 'string') return null;
  
  // Extract from Cloudinary URL patterns
  const patterns = [
    /MKF_CPB\/products\/([^\/.]+)/,
    /\/upload\/.*\/(MKF_CPB\/products\/[^\/.]+)/,
    /image\/upload\/.*\/(v[^\/]+\/)?(MKF_CPB\/products\/[^\/.]+)/,
    /products\/([^\/.]+)/ // Simple pattern
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      // Return the last segment (filename without extension)
      const fullPath = match[match.length - 1];
      const segments = fullPath.split('/');
      const filename = segments[segments.length - 1];
      return filename.split('.')[0]; // Remove extension
    }
  }
  
  return null;
}

/**
 * Generate friendly image URL
 */
function generateFriendlyUrl(product, options = {}) {
  const {
    imageIndex = 0,
    imageType = 'main', // 'main' or 'gallery'
    imageName = '',
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  } = options;
  
  let imageData;
  let cloudinaryId;
  
  if (imageType === 'main' && product.image?.url) {
    imageData = product.image;
    cloudinaryId = extractCloudinaryId(imageData.url) || imageData.public_id?.split('/').pop();
  } else if (imageType === 'gallery' && product.images?.[imageIndex]?.url) {
    imageData = product.images[imageIndex];
    cloudinaryId = extractCloudinaryId(imageData.url) || imageData.public_id?.split('/').pop();
  }
  
  if (!cloudinaryId) return null;
  
  // Generate friendly name
  const friendlyName = imageName || 
                      imageData?.title?.toLowerCase().replace(/\s+/g, '-') || 
                      (imageType === 'main' ? 'main' : `image${imageIndex + 1}`);
  
  // Return friendly URL
  return `${baseUrl}/custom-packaging/${product.categorySlug}/${product.slug}/${friendlyName}?id=${cloudinaryId}`;
}

/**
 * Process product to add proxy URLs
 */
function processProductWithProxyUrls(product, baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') {
  if (!product) return product;
  
  const processedProduct = JSON.parse(JSON.stringify(product));
  const category = processedProduct.categorySlug || 'products';
  
  // Process main image
  if (processedProduct.image?.url) {
    const cloudinaryId = extractCloudinaryId(processedProduct.image.url) || 
                        processedProduct.image.public_id?.split('/').pop();
    if (cloudinaryId) {
      processedProduct.image.proxyUrl = `${baseUrl}/custom-packaging/${category}/${processedProduct.slug}/main?id=${cloudinaryId}`;
      processedProduct.image.apiProxyUrl = `${baseUrl}/api/proxy-image/${cloudinaryId}`;
      processedProduct.image.cloudinaryId = cloudinaryId;
      processedProduct.image.friendlyUrl = `${baseUrl}/custom-packaging/${category}/${processedProduct.slug}/main`;
    }
  }
  
  // Process gallery images
  if (Array.isArray(processedProduct.images)) {
    processedProduct.images = processedProduct.images.map((img, index) => {
      if (img?.url) {
        const cloudinaryId = extractCloudinaryId(img.url) || 
                            img.public_id?.split('/').pop();
        if (cloudinaryId) {
          const friendlyName = img.title?.toLowerCase().replace(/\s+/g, '-') || `image${index + 1}`;
          return {
            ...img,
            proxyUrl: `${baseUrl}/custom-packaging/${category}/${processedProduct.slug}/${friendlyName}?id=${cloudinaryId}`,
            apiProxyUrl: `${baseUrl}/api/proxy-image/${cloudinaryId}`,
            cloudinaryId: cloudinaryId,
            friendlyName: friendlyName,
            friendlyUrl: `${baseUrl}/custom-packaging/${category}/${processedProduct.slug}/${friendlyName}`,
          };
        }
      }
      return img;
    });
  }
  
  return processedProduct;
}

// ============ STATIC METHODS ============

/**
 * Find product by slug with enhanced image URLs
 */
ProductSchema.statics.findBySlugWithProxyUrls = async function(slug, baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') {
  try {
    const product = await this.findOne({ slug }).lean();
    if (!product) return null;
    
    return processProductWithProxyUrls(product, baseUrl);
  } catch (error) {
    console.error('Error finding product with proxy URLs:', error);
    return null;
  }
};

/**
 * Get all products with proxy URLs
 */
ProductSchema.statics.findAllWithProxyUrls = async function(baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') {
  try {
    const products = await this.find({}).lean();
    return products.map(product => processProductWithProxyUrls(product, baseUrl));
  } catch (error) {
    console.error('Error finding products with proxy URLs:', error);
    return [];
  }
};

// ============ INSTANCE METHODS ============

/**
 * Get all image URLs for this product
 */
ProductSchema.methods.getAllImageUrls = function(baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') {
  const product = this.toObject ? this.toObject() : this;
  const processedProduct = processProductWithProxyUrls(product, baseUrl);
  
  const urls = [];
  
  // Main image
  if (processedProduct.image?.proxyUrl) {
    urls.push({
      type: 'main',
      url: processedProduct.image.proxyUrl,
      directUrl: processedProduct.image.url,
      alt: processedProduct.image.alt || processedProduct.image.title || processedProduct.name,
      title: processedProduct.image.title || 'Main Product Image',
      proxyUrl: processedProduct.image.proxyUrl,
      apiProxyUrl: processedProduct.image.apiProxyUrl,
      cloudinaryId: processedProduct.image.cloudinaryId,
      friendlyName: 'main'
    });
  }
  
  // Gallery images
  if (Array.isArray(processedProduct.images)) {
    processedProduct.images.forEach((img) => {
      if (img?.proxyUrl) {
        urls.push({
          type: 'gallery',
          url: img.proxyUrl,
          directUrl: img.url,
          alt: img.alt || img.title || `${processedProduct.name} - Image`,
          title: img.title || 'Product Image',
          proxyUrl: img.proxyUrl,
          apiProxyUrl: img.apiProxyUrl,
          cloudinaryId: img.cloudinaryId,
          friendlyName: img.friendlyName,
        });
      }
    });
  }
  
  return urls;
};

/**
 * Get main image URL
 */
ProductSchema.methods.getMainImageUrl = function(baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') {
  return generateFriendlyUrl(this, {
    imageType: 'main',
    baseUrl: baseUrl
  });
};

/**
 * Get gallery image URL by index
 */
ProductSchema.methods.getGalleryImageUrl = function(index, baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') {
  return generateFriendlyUrl(this, {
    imageType: 'gallery',
    imageIndex: index,
    baseUrl: baseUrl
  });
};

// Check if model exists before compiling
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;