/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/personal_site',
  assetPrefix: '/personal_site/',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
