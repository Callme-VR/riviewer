import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Hide source map related warnings
  productionBrowserSourceMaps: false,
  // Explicitly configure packages for better Turbopack compatibility
 
  // Enable Turbopack (default in Next.js 16)
  // If you need custom configuration, you can add it here
  // turbopack: {}
};

export default nextConfig;