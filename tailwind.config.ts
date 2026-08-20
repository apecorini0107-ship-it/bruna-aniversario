import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FBF1EA",
          dark: "#F3E2D4",
        },
        blush: {
          DEFAULT: "#F1D6DB",
          dark: "#E3B6C0",
        },
        bordeaux: {
          light: "#8C2F45",
          DEFAULT: "#6E1F31",
          dark: "#4A1420",
        },
        deepred: "#8C1F3B",
        gold: {
          DEFAULT: "#D4AF7A",
          soft: "#E6D2AC",
        },
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(110, 31, 49, 0.25)",
        glow: "0 0 0 1px rgba(212, 175, 122, 0.4), 0 10px 30px -8px rgba(140, 31, 59, 0.35)",
      },
      borderRadius: {
        xl2: "1.75rem",
        xl3: "2.25rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-18px) translateX(6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        shimmer: "shimmer 6s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
