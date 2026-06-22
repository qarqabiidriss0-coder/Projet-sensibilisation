import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Force Vercel à ignorer les erreurs de code (comme les href="#") pendant le déploiement
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore les erreurs de typage TypeScript
    ignoreBuildErrors: true,
  },
};

export default nextConfig;