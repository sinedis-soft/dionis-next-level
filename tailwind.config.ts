import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brandDark: "#1A3A5F",   // тёмный синий
        brandGreen: "#0A6363",  // зелёный
        brandBg: "#F7F7F7",     // светлый фон
        brandGold: "#C89F4A",   // золотистый
      },
    },
  },
  plugins: [],
};

export default config;
