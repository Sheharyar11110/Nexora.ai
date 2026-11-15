import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.25rem", screens: { "2xl": "1320px" } },
    extend: {
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Geist", "ui-sans-serif", "sans-serif"],
        serif: ["Instrument Serif", "ui-serif", "Georgia", "serif"],
        mono: ["Geist Mono", "ui-monospace", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        /* Brand */
        ink: { DEFAULT: "#111111", soft: "#2a2a2a" },
        paper: { DEFAULT: "#F5F3EE", deep: "#ECE9E1" },
        brand: { DEFAULT: "#D4FF3A", deep: "#B8E61A" },
        flame: { DEFAULT: "#F0541E", soft: "#FFE3D6" },
        lilac: { DEFAULT: "#E7E2FF", deep: "#5B4BFF" },
        peach: "#FFE7D9",
        mint: { DEFAULT: "#DDF3E6", deep: "#0E9F6E" },
        mist: "#E3EDF7",
        butter: "#FFF2C2",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(17,17,17,.04), 0 8px 24px -12px rgba(17,17,17,.12)",
        lift: "0 2px 4px rgba(17,17,17,.04), 0 24px 48px -20px rgba(17,17,17,.25)",
        ring: "0 0 0 1px rgba(17,17,17,.06)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(calc(-50% - var(--gap,3rem)/2))" } },
        float: { "0%,100%": { transform: "translateY(0) rotate(var(--r,0deg))" }, "50%": { transform: "translateY(-10px) rotate(var(--r,0deg))" } },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
      },
      animation: {
        marquee: "marquee var(--duration,40s) linear infinite",
        float: "float 7s ease-in-out infinite",
        "spin-slow": "spin-slow 14s linear infinite",
        blink: "blink 1s step-end infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
