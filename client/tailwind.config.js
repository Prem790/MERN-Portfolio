/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1F2833",
        secondary: "#66FCF1",
        tertiary: "#45A29E",
        // deeper base tones used for the glassmorphism gradient background
        base: "#0B0F17",
        base2: "#111826",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Clash Display'", "Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(102, 252, 241, 0.35)",
        "glow-sm": "0 0 20px -6px rgba(102, 252, 241, 0.30)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.37)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -30px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        gradient: "gradientShift 8s ease infinite",
        shimmer: "shimmer 1.6s infinite",
        blob: "blob 14s ease-in-out infinite",
      },
    },
    screens: {
      // Kept from the original config so existing responsive classes still work:
      // base styles target desktop, `sm:`/`lg:` apply below these max-widths.
      lg: { max: "2023px" },
      sm: { max: "1000px" },
    },
  },
  plugins: [],
};
