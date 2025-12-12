import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide source map related warnings
  productionBrowserSourceMaps: false,
  // Enable Turbopack (default in Next.js 16)
  // If you need custom configuration, you can add it here
  // turbopack: {}
};

export default nextConfig;