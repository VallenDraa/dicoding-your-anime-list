/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/index.html"],
  safelist: ["text-slate-300/90"],
  theme: {
    fontFamily: { sans: ["Inter", "Segoe UI", "sans-serif"] },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
