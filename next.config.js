/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,   // Helps catch potential problems
  swcMinify: true,         // Faster minification
  images: {
    unoptimized: true,     // Optional: disable Next.js image optimization if you don't use it
  },
  experimental: {
    serverActions: true,   // Optional: enable server actions if needed
  },
};

module.exports = nextConfig;

