import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GoDaddy shared hosting (Apache/cPanel)
  output: "export",
  trailingSlash: true,

  transpilePackages: ["three"],

  images: {
    // Required for static export — Next.js image optimisation is server-side only
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  experimental: {
    optimizePackageImports: [
      "@react-three/fiber",
      "@react-three/drei",
      "framer-motion",
      "three",
    ],
  },

  productionBrowserSourceMaps: false,

  // Note: headers() is not supported in static export mode.
  // Security headers are handled via public/.htaccess for Apache/GoDaddy.
};

export default nextConfig;
