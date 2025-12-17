/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#F97316",
        darkBg: "#0F172A",
      },
      backgroundImage: {
        "btn-blue-pink": "linear-gradient(90deg, #3494e6, #ec6ead)",
        "btn-green-blue": "linear-gradient(90deg, #67b26f, #4ca2cd)",
        "btn-pink-red": "linear-gradient(90deg, #ec008c, #fc6767)",
      },
    },
  },
  plugins: [],
};
