/** @type {import('next').NextConfig} */
const nextConfig = {
  serverActions: {
    bodySizeLimit: '10mb', // You can increase to 10mb or higher as needed
  },
  // Optional: for image handling, etc.
  images: {
    domains: [],
  },
};

module.exports = nextConfig;
