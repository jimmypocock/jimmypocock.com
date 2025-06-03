import type { Config } from "tailwindcss";

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Add your brand colors here
        primary: "#ff6100",
        secondary: "#2196f3", 
        accent: "#ff6100",
        neutral: "#9ca3af",
      },
      fontFamily: {
        sans: ["var(--font-ui)", "sans-serif"],
        serif: ["var(--font-content)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;