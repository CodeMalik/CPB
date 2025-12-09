// lib/image-utils.js

/**
 * Extract Cloudinary ID from URL
 */
export function extractCloudinaryId(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') return null;
  
  // Pattern for Cloudinary URLs
  const patterns = [
    /MKF_CPB\/products\/([^\/.]+)/,
    /\/upload\/.*\/(MKF_CPB\/products\/[^\/.]+)/,
    /image\/upload\/.*\/(v[^\/]+\/)?(MKF_CPB\/products\/[^\/.]+)/
  ];
  
  for (const pattern of patterns) {
    const match = imageUrl.match(pattern);
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
export function generateFriendlyUrl(options = {}) {
  const {
    cloudinaryId,
    category = 'products',
    productSlug = '',
    imageName = '',
    imageIndex = 0,
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    useFriendlyPath = true
  } = options;
  
  if (!cloudinaryId) return null;
  
  if (useFriendlyPath) {
    // Generate human-readable URL
    const friendlyName = imageName || `image${imageIndex + 1}`;
    return `${baseUrl}/custom-packaging/${category}/${productSlug}/${friendlyName}?id=${cloudinaryId}`;
  } else {
    // Generate API proxy URL
    return `${baseUrl}/api/proxy-image/${cloudinaryId}`;
  }
}

/**
 * Process image object to add proxy URLs
 */
export function processImageForProxy(image, options = {}) {
  if (!image || !image.url) return image;
  
  const {
    category = 'products',
    productSlug = '',
    imageName = '',
    imageIndex = 0,
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  } = options;
  
  const cloudinaryId = extractCloudinaryId(image.url);
  
  if (!cloudinaryId) {
    return {
      ...image,
      proxyUrl: image.url,
      directUrl: image.url
    };
  }
  
  const proxyUrl = generateFriendlyUrl({
    cloudinaryId,
    category,
    productSlug,
    imageName,
    imageIndex,
    baseUrl
  });
  
  return {
    ...image,
    cloudinaryId,
    proxyUrl,
    directUrl: image.url,
    friendlyName: imageName || `image${imageIndex + 1}`
  };
}

/**
 * Get all images with proxy URLs for a product
 */
export function getAllProductImages(product, baseUrl) {
  const images = [];
  const category = product?.categorySlug || 'products';
  const productSlug = product?.slug || '';
  
  // Process main image
  if (product?.image?.url) {
    images.push(processImageForProxy(product.image, {
      category,
      productSlug,
      imageName: 'main',
      imageIndex: 0,
      baseUrl
    }));
  }
  
  // Process gallery images
  if (Array.isArray(product?.images)) {
    product.images.forEach((img, index) => {
      if (img?.url) {
        images.push(processImageForProxy(img, {
          category,
          productSlug,
          imageName: img.friendlyName || `image${index + 1}`,
          imageIndex: index + 1,
          baseUrl
        }));
      }
    });
  }
  
  return images;
}

/**
 * Create Open Graph image URLs
 */
export function getOgImageUrl(image, options = {}) {
  const {
    width = 1200,
    height = 630,
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  } = options;
  
  if (!image?.url) return null;
  
  const cloudinaryId = extractCloudinaryId(image.url);
  if (!cloudinaryId) return image.url;
  
  // For OG images, we might want different transformations
  const transformations = `c_fill,w_${width},h_${height},f_auto,q_90`;
  
  return `${baseUrl}/api/proxy-image/${cloudinaryId}?transform=${transformations}`;
}