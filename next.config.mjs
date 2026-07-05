/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@owlmask/ui'],
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
