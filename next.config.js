// next.config.js
// Base Wallet Screener — Next.js configuration

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  output: "standalone",
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
