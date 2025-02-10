import { imageSources, securityHeaders } from "@/utils/security-headers";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: imageSources.map((source) => ({ protocol: 'https', hostname: source })),
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
