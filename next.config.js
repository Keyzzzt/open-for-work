/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com', 'tailwindui.com'],
  },
  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
  },
}

module.exports = nextConfig
