/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Cairo", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Cairo", "sans-serif"],
      },
      colors: {
        brand: "#7c6cf8",
        "brand-cyan": "#00d4ff",
      },
    },
  },
  plugins: [],
};
