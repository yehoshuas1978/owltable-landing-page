import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isGitHubPages ? '/owltable-landing-page' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
