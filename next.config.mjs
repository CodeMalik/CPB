/** @type {{headers(): Promise<[{source: string, headers: [{key: string, value: string},{key: string, value: string},{key: string, value: string},{key: string, value: string},{key: string, value: string}]}]>, images: {domains: string[]}, htmlLimitedBots: string}} */
const nextConfig = {
    images: {
    domains: ["custompackboxes.com", "res.cloudinary.com", "images.unsplash.com", "cdn.pixabay.com", "timpackaging.com"],
  },
  htmlLimitedBots: '.*',
};

export default nextConfig;
