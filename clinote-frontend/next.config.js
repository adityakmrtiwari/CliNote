/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  swcMinify: true,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  optimizeFonts: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
