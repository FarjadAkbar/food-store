/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "img.spoonacular.com",
      "spoonacular.com",
      "placehold.co"
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
