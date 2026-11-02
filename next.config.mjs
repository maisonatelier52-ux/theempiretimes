/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['10.194.1.26', '192.168.29.85', 'localhost', '127.0.0.1'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
