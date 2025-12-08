import { NextResponse } from 'next/server'

// Cache for image responses
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
    const fullPath = path.join('/');
    
    // Extract the last segment as the image filename
    const pathSegments = fullPath.split('/');
    let filename = pathSegments.pop();
    
    // Extract filename from query parameter if provided
    const filenameFromQuery = searchParams.get('filename');
    if (filenameFromQuery) {
      filename = filenameFromQuery;
    }
    
    // Check if filename has an extension
    const hasExtension = /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(filename);
    
    let cloudinaryId;
    let transformation = 'f_png,q_100';
    let version = 'v1763560320';
    
    if (hasExtension) {
      // If filename has extension, use it as-is
      cloudinaryId = filename;
    } else {
      // If no extension, the filename is likely the ID
      // Check if we have transformation/version in the path
      const possibleId = filename;
      
      // Look for transformation and version in previous segments
      const transformIndex = pathSegments.findIndex(seg => seg.startsWith('t_'));
      if (transformIndex !== -1) {
        transformation = pathSegments[transformIndex];
        pathSegments.splice(transformIndex, 1);
      }
      
      const versionIndex = pathSegments.findIndex(seg => seg.startsWith('v'));
      if (versionIndex !== -1 && /^v\d+$/.test(pathSegments[versionIndex])) {
        version = pathSegments[versionIndex];
        pathSegments.splice(versionIndex, 1);
      }
      
      cloudinaryId = possibleId;
      
      // Ensure filename has extension based on transformation
      const formatMatch = transformation.match(/f_(\w+)/);
      const format = formatMatch ? formatMatch[1] : 'png';
      filename = `${filename}.${format}`;
    }
    
    // Build cache key
    const cacheKey = `${cloudinaryId}_${transformation}_${version}`;
    const cached = imageCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
      console.log(`Cache hit for: ${cacheKey}`);
      return new NextResponse(cached.buffer, {
        status: 200,
        headers: {
          ...cached.headers,
          // Add Content-Disposition for better browser display
          'Content-Disposition': `inline; filename="${encodeURIComponent(filename)}"`,
          'X-Content-Type-Options': 'nosniff',
        }
      });
    }
    
    // Build Cloudinary URL
    const cloudinaryUrl = `https://res.cloudinary.com/dfnjpfucl/image/upload/${transformation}/${version}/MKF_CPB/products/${cloudinaryId}`;
    
    // Fetch the image
    const response = await fetch(cloudinaryUrl);
    
    if (!response.ok) {
      // Try without version if versioned URL fails
      const fallbackUrl = `https://res.cloudinary.com/dfnjpfucl/image/upload/${transformation}/MKF_CPB/products/${cloudinaryId}`;
      const fallbackResponse = await fetch(fallbackUrl);
      
      if (!fallbackResponse.ok) {
        throw new Error(`Failed to fetch image: ${response.status} and ${fallbackResponse.status}`);
      }
      
      const imageBuffer = await fallbackResponse.arrayBuffer();
      const contentType = fallbackResponse.headers.get('content-type') || 'image/png';
      
      // Prepare response headers
      const headers = {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${encodeURIComponent(filename)}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'CDN-Cache-Control': 'public, max-age=31536000, immutable',
        'Vary': 'Accept-Encoding',
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
    }
    
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/png';
    
    // Prepare response headers
    const headers = {
      'Content-Type': contentType,
      'Content-Disposition': `inline; filename="${encodeURIComponent(filename)}"`,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'CDN-Cache-Control': 'public, max-age=31536000, immutable',
      'Vary': 'Accept-Encoding',
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
    
    // Return a placeholder image on error
    const placeholderSvg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f0f0f0"/>
      <text x="200" y="150" text-anchor="middle" fill="#666" font-family="Arial" font-size="14">
        Image not available
      </text>
    </svg>`;
    
    return new NextResponse(placeholderSvg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Disposition': 'inline; filename="placeholder.svg"',
      }
    });
  }
}

export const dynamic = 'force-dynamic';
export const runtime = 'edge';