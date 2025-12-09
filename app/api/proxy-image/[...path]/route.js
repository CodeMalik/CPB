// app/api/proxy-image/[...path]/route.js
import { NextResponse } from 'next/server'

const imageCache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

// Clear old cache entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of imageCache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      imageCache.delete(key);
    }
  }
}, 60000);

export async function GET(request, { params }) {
  try {
    const { path } = await params;
    const { searchParams } = new URL(request.url);
    
    // Join the path segments
    const fullPath = Array.isArray(path) ? path.join('/') : path;
    
    console.log('Full path requested:', fullPath);
    console.log('Search params:', Object.fromEntries(searchParams.entries()));
    
    // Extract ID from query parameter (this comes from your friendly URLs)
    const cloudinaryIdFromQuery = searchParams.get('id');
    
    let cloudinaryId = cloudinaryIdFromQuery;
    let filename = 'image.png';
    
    // If no ID in query params, try to extract from path
    if (!cloudinaryId) {
      // Check if path looks like a Cloudinary ID (alphanumeric, possibly with extensions)
      const pathSegments = fullPath.split('/');
      const lastSegment = pathSegments.pop() || '';
      
      // Try to extract Cloudinary ID from the path
      const possibleId = lastSegment.replace(/\.[^/.]+$/, ""); // Remove extension
      
      // Check if this looks like a Cloudinary ID (not a friendly name)
      if (possibleId && /^[a-zA-Z0-9_-]+$/.test(possibleId) && possibleId.length > 10) {
        cloudinaryId = possibleId;
        filename = `${possibleId}.png`;
      } else {
        // This might be a friendly URL path like "custom-packaging/boxes/product/main"
        // Extract just the last segment and use it as filename
        filename = lastSegment || 'image.png';
        
        // For friendly URLs, we need to look up the actual Cloudinary ID
        // For now, return a placeholder or try to find the image
        console.log('Friendly URL detected, but no ID provided:', fullPath);
        
        // Try to extract ID from the full path pattern
        const idMatch = fullPath.match(/\/([a-zA-Z0-9_-]{10,})(?:\.\w+)?$/);
        if (idMatch) {
          cloudinaryId = idMatch[1];
          filename = `${cloudinaryId}.png`;
        }
      }
    } else {
      // We have an ID from query params
      filename = `${cloudinaryId}.png`;
    }
    
    if (!cloudinaryId) {
      console.error('No Cloudinary ID found in request');
      throw new Error('No image ID provided');
    }
    
    // Build cache key
    const cacheKey = `${cloudinaryId}_default`;
    const cached = imageCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
      console.log(`Cache hit for: ${cacheKey}`);
      return new NextResponse(cached.buffer, {
        status: 200,
        headers: {
          ...cached.headers,
          'Content-Disposition': `inline; filename="${encodeURIComponent(filename)}"`,
          'X-Content-Type-Options': 'nosniff',
        }
      });
    }
    
    // Build Cloudinary URL with auto format and quality
    const cloudinaryUrl = `https://res.cloudinary.com/dfnjpfucl/image/upload/q_auto,f_auto/MKF_CPB/products/${cloudinaryId}`;
    
    console.log('Fetching image from Cloudinary:', cloudinaryUrl);
    
    // Fetch the image
    const response = await fetch(cloudinaryUrl);
    
    if (!response.ok) {
      console.error('Cloudinary fetch failed:', response.status);
      
      // Try with different formats
      const formats = ['png', 'jpg', 'jpeg', 'webp'];
      
      for (const format of formats) {
        const formatUrl = `https://res.cloudinary.com/dfnjpfucl/image/upload/MKF_CPB/products/${cloudinaryId}.${format}`;
        console.log(`Trying format ${format}:`, formatUrl);
        
        const formatResponse = await fetch(formatUrl);
        if (formatResponse.ok) {
          const imageBuffer = await formatResponse.arrayBuffer();
          const contentType = formatResponse.headers.get('content-type') || `image/${format}`;
          
          const headers = {
            'Content-Type': contentType,
            'Content-Disposition': `inline; filename="${encodeURIComponent(`${cloudinaryId}.${format}`)}"`,
            'Cache-Control': 'public, max-age=31536000, immutable',
            'Access-Control-Allow-Origin': '*',
            'X-Content-Type-Options': 'nosniff',
          };
          
          imageCache.set(cacheKey, {
            buffer: imageBuffer,
            headers: headers,
            timestamp: Date.now()
          });
          
          return new NextResponse(imageBuffer, {
            status: 200,
            headers: headers
          });
        }
      }
      
      throw new Error(`Failed to fetch image: ${response.status}`);
    }
    
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/png';
    
    // Prepare response headers
    const headers = {
      'Content-Type': contentType,
      'Content-Disposition': `inline; filename="${encodeURIComponent(filename)}"`,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
    };
    
    // Cache the response
    imageCache.set(cacheKey, {
      buffer: imageBuffer,
      headers: headers,
      timestamp: Date.now()
    });
    
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: headers
    });
    
  } catch (error) {
    console.error('Proxy image error:', error);
    
    // Return a proper image placeholder instead of SVG text
    const placeholderImage = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      'base64'
    );
    
    return new NextResponse(placeholderImage, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-cache',
        'Content-Disposition': 'inline; filename="placeholder.png"',
      }
    });
  }
}

export const dynamic = 'force-dynamic';