/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    '/deck': ['./deck.html'],
  },
}

module.exports = nextConfig

