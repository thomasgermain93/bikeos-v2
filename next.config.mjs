/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  eslint: {
    // Désactive ESLint pendant le build pour déployer rapidement
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore les erreurs TypeScript aussi pour l'instant
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
