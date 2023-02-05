/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/index.html"],
  safelist: [
    "text-slate-300/90",
    "inline",
    "px-2.5",
    "py-0.5",
    "text-xs",
    "bg-slate-600",
  ],
  theme: {
    fontFamily: { sans: ["Inter", "Segoe UI", "sans-serif"] },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
