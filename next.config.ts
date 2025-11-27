import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/owltable-landing-page',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
