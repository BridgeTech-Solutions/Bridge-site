import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ne pas exposer la version de Next.js dans les headers
  poweredByHeader: false,

  images: {
    // Formats modernes : AVIF en premier (meilleure compression), WebP en fallback
    formats: ["image/avif", "image/webp"],
    // Tailles de viewport utilisées pour les srcset
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Tailles pour les images à dimensions fixes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};

export default nextConfig;
