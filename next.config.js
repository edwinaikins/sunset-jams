/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // All images are static local assets in /public — the built-in Image
  // Optimization API route isn't needed, so it's disabled outright rather
  // than relying on a currently-unpatched-in-14.x advisory affecting it.
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
