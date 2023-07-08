/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://nest-persons-elfoslav.vercel.app/:path*',
      },
    ]
  },
}

module.exports = nextConfig
