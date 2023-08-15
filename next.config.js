/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.clerk.dev", "www.gravatar.com", "img.clerk.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
