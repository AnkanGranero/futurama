import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
      images: {
    remotePatterns: [
      { protocol: "https", hostname: "futuramaapi.com" },
     
    ],
  },
};

export default nextConfig;
