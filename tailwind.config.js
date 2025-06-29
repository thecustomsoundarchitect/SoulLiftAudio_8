/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soul-purple': '#8B5CF6',
        'soul-blue': '#3B82F6',
        'soul-gradient-start': '#8B5CF6',
        'soul-gradient-end': '#3B82F6',
      },
      backgroundImage: {
        'soul-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
        'soul-gradient-light': 'linear-gradient(135deg, #F3E8FF 0%, #EBF4FF 100%)',
      },
    },
  },
  plugins: [],
}