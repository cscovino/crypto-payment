import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#002859',
          light: '#035AC5',
          brilliant: '#0465DD',
        },
        secondary: {
          dark: '#15BBE0',
        },
        complementary: {
          300: '#71B0FD',
          400: '#C6DFFE',
        },
        warning: '#EAB308',
        success: '#16A34A',
        danger: '#DC2626',
        dark: {
          400: '#647184',
          500: '#C0CCDA',
        },
        light: {
          white: '#FFFFFF',
          300: '#E5E9F2',
          400: '#EFF2F7',
          500: '#F9FAFC',
        },
      },
    },
  },
  plugins: [],
};
export default config;
