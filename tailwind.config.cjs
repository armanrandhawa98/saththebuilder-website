/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slatey: {
          50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1",
          400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155",
          800: "#1f2937", 900: "#0f172a"
        },
        wood: {
          50: "#fdfaf7", 100: "#f9f2e9", 200: "#f0e2cc", 300: "#e6cfa3",
          400: "#d9b76a", 500: "#c19a42", 600: "#a67c35", 700: "#8b632b",
          800: "#724f25", 900: "#5d3f1f"
        },
        accent: {
          50: "#f0f9f4", 100: "#dcf2e3", 200: "#bbe4ca", 300: "#8ccea8",
          400: "#57b081", 500: "#369660", 600: "#297a4c", 700: "#22623e",
          800: "#1e4f33", 900: "#1a422b"
        },
        craft: {
          50: "#faf7f2", 100: "#f4ede0", 200: "#e8d9c0", 300: "#d8c097",
          400: "#c5a06b", 500: "#b5884a", 600: "#a0733e", 700: "#855c34",
          800: "#6d4a2e", 900: "#5a3d27"
        },
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(0,0,0,0.25)",
        "wood": "0 8px 25px -5px rgba(139, 99, 43, 0.3), 0 4px 6px -2px rgba(139, 99, 43, 0.1)",
        "craft": "0 20px 40px -12px rgba(90, 61, 39, 0.4)",
      },
      fontFamily: {
        'display': ['Georgia', 'Times New Roman', 'serif'],
        'craft': ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'wood-grain': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23d9b76a\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        'subtle-grain': "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23c19a42\" fill-opacity=\"0.05\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"1\"/%3E%3Ccircle cx=\"13\" cy=\"13\" r=\"1\"/%3E%3C/g%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
};
