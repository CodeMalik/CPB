/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["custompackboxes.com", "res.cloudinary.com", "images.unsplash.com", "cdn.pixabay.com", "timpackaging.com"],
  },
  
  // Add rewrites for friendly image URLs
  async rewrites() {
    return [
      {
        source: '/custom-packaging/:category/:product/:imageName',
        destination: '/api/proxy-image/:category/:product/:imageName',
      },
      {
        source: '/images/:path*',
        destination: 'https://res.cloudinary.com/dfnjpfucl/image/upload/:path*',
      },
    ]
  },
  
  // Headers for better caching
  async headers() {
    return [
      {
        source: '/api/proxy-image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Vary',
            value: 'Accept-Encoding',
          },
        ],
      },
      {
        source: '/custom-packaging/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  htmlLimitedBots: '.*',
};

export default nextConfig;