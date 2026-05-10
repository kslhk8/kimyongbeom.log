import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
};

export default config;