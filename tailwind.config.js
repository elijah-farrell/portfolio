import tailwindAnimate from "tailwindcss-animate";

export default {
  darkMode: "class", // use .dark on <html>
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      screens: { nav: "768px" },
      colors: {
        background: "var(--background)",
        text: "var(--text)",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [tailwindAnimate],
};
