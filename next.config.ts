import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-expect-error - This property is valid at runtime even if types complain
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;