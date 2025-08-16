/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 768, 1024, 1280], // good spread for phones/tablets
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  swcMinify: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
