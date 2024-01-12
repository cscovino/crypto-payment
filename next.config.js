/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'es',
  },
  images: {
    remotePatterns: [
      {
        hostname: 'payments.pre-bnvo.com',
      },
    ],
  },
};

module.exports = nextConfig;
