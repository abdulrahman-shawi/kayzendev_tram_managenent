import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  outputFileTracingRoot: path.join(__dirname), // تحديد جذر المشروع لتجنب تحذيرات lockfiles
  eslint: {
    ignoreDuringBuilds: true, // لتجاهل تحذيرات ESLint أثناء البناء
  },
};

export default nextConfig;
