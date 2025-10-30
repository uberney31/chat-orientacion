import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_URL: 'https://web-production-b9f06.up.railway.app',
    NEXT_PUBLIC_APP_NAME: 'orientational_agent',
  },
};

export default nextConfig;
