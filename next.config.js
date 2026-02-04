/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,

  // Turbopack: pin the workspace root to THIS folder so it ignores
  // any stray package-lock.json sitting in C:\Users\HP\
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
