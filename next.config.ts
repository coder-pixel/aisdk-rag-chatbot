import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Tells Next.js to treat pdf-parse as a standard Node.js module on the server
  serverExternalPackages: ["pdf-parse"],
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
