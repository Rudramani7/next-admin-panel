/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        sidebar: "#1F2937",
        navbar: "#111827"
      }
    },
  },
  darkMode: "class",
  plugins: [],
}
