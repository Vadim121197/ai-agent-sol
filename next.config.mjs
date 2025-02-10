/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img-v1.raydium.io',
        port: '',
      },
    ],
  },
};

export default nextConfig;
