import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // For rapid development
  },
  eslint: {
    ignoreDuringBuilds: true, // Bypass linting for Vercel deployment
  },

};

export default nextConfig;
