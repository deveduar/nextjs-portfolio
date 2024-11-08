/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.ibb.co',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'placehold.co',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
