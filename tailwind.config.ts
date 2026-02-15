import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        heading: ["var(--font-inter)"],
        body: ["var(--font-inter)"]
      }
    }
  },
  plugins: []
};

export default config;
