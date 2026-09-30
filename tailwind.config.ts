import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#1D5C3A",
          dark: "#144229",
          hover: "#16462C",
          light: "#EBF5F0",
          50: "#F2F8F4",
          100: "#E3EFE8",
          200: "#C4DFD1",
          600: "#1D5C3A",
          700: "#16462C",
          800: "#103421",
        },
        ivory: {
          DEFAULT: "#FAFAF7",
          dark: "#F4F4EE",
        },
        charcoal: {
          DEFAULT: "#1C1C1C",
          light: "#2E2E2E",
        },
        mutedText: "#6B7280",
        borderGray: "#E5E7EB",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "Menlo", "monospace"],
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(1.2)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        }
      },
      animation: {
        "pulse-dot": "pulseDot 1.5s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
      }
    },
  },
  plugins: [],
};
export default config;
