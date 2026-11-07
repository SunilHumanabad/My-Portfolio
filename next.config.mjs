/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build a fully static site into /out — deploy it anywhere (Vercel, Netlify, GitHub Pages…).
  output: 'export',
  reactStrictMode: true,
  images: {
    // Static export has no image server. Images in /public/assets are pre-optimised WebP.
    unoptimized: true,
  },
};

export default nextConfig;
