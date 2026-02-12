import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration pour Vercel
  output: 'standalone',
  
  // Permettre les images externes si nécessaire
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
