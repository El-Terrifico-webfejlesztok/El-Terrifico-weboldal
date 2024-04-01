import type { Config } from "tailwindcss";

// Az első téma ami itt meg van adva az alapértelmezett.
// Sütiben tárolódik a kiválasztott téma
export const themes = ["retro", "black", "luxury", "cmyk", "cyberpunk",
  "synthwave", "aqua",]

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: themes,
  },
};
export default config;

// "cyberpunk", "aqua"