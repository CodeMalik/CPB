/** @type {{headers(): Promise<[{source: string, headers: [{key: string, value: string},{key: string, value: string},{key: string, value: string},{key: string, value: string},{key: string, value: string}]}]>, images: {domains: string[]}, htmlLimitedBots: string}} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/(.*)",        // apply to all routes
                headers: [
                    // Prevent MIME-type sniffing
                    { key: "X-Content-Type-Options", value: "nosniff" },

                    // Clickjacking protection
                    { key: "X-Frame-Options", value: "DENY" },

                    // Hide full referrer except same-origin or secure requests
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

                    // Strong TLS enforcement
                    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },

                    // Content Security Policy – adjust sources to your needs
                    {
                        key: "Content-Security-Policy",
                        value: "default-src 'self'; img-src 'self' https: data:; script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'; frame-ancestors 'none';"
                    },
                ],
            },
        ];
    },
  images: {
    domains: ["custompackboxes.com", "res.cloudinary.com", "images.unsplash.com", "cdn.pixabay.com", "timpackaging.com"],
  },
  htmlLimitedBots: '.*',
};

export default nextConfig;
