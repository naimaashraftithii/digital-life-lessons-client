/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",   // Indigo
        secondary: "#F97316", // Orange accent
        darkBg: "#0F172A",
      },
    },
  },
  plugins: [],
};

