/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["custompackboxes.com", "res.cloudinary.com", "images.unsplash.com", "cdn.pixabay.com", "timpackaging.com"],
  },
  htmlLimitedBots: '.*',
};

export default nextConfig;
