/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
}

export default nextConfig
