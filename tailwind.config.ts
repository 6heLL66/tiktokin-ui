import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      colors: {
        primary: {
          DEFAULT: '#2188ff',
          50: '#e3f2ff',
          100: '#b3d9ff',
          200: '#80bfff',
          300: '#4da6ff',
          400: '#2188ff',
          500: '#0366d6',
          600: '#0256b0',
          700: '#024589',
          800: '#013463',
          900: '#00233c',
        },
        secondary: {
          DEFAULT: '#79c7ff',
          50: '#f0f9ff',
          100: '#d8f1ff',
          200: '#79c7ff',
          300: '#34adff',
          400: '#0090ff',
          500: '#006ec7',
          600: '#005294',
          700: '#003661',
          800: '#001a2e',
          900: '#000c15',
        },
        neutral: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
        background: {
          DEFAULT: '#0d1117',
          light: '#161b22',
          lighter: '#21262d',
        },
        foreground: {
          DEFAULT: '#c9d1d9',
          light: '#e6edf3',
          muted: '#8b949e',
        },
      },
    },
  },
  plugins: [],
}

export default config 