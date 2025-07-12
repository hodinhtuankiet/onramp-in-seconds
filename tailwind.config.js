/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        gray: {
          900: '#111111',
          800: '#1f1f1f',
          700: '#374151',
          600: '#4b5563',
          500: '#6b7280',
          400: '#9ca3af',
        },
        red: {
          500: '#ef4444',
          600: '#dc2626',
        },
        purple: {
          400: '#a855f7',
        },
      },
    },
  },
  plugins: [],
  important: true, // This will make Tailwind classes more specific
}