import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Linear-style monochrome canvas
        canvas: "#0A0B0D",
        ink: "#F4F4F5",
        // AI/clinical accents
        teal: {
          DEFAULT: "#5EE2C7",
          50: "#E8FBF7",
          100: "#C5F4E9",
          400: "#7CEBD3",
          500: "#5EE2C7",
          600: "#3CC6AB",
          700: "#2A9C86",
        },
        amber: {
          DEFAULT: "#F5A623",
          400: "#FFB84A",
          500: "#F5A623",
          600: "#D88B0E",
        },
        // shadcn token bridge (kept for ui/* components, remapped to dark canvas)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Inter Tight"', '"Inter"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(94, 226, 199, 0.18), 0 20px 60px -20px rgba(94, 226, 199, 0.25)",
        ringTeal: "0 0 0 3px rgba(94, 226, 199, 0.32)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(244,244,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(244,244,245,0.04) 1px, transparent 1px)",
        "teal-radial":
          "radial-gradient(circle at 50% 0%, rgba(94, 226, 199, 0.18), transparent 60%)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "ticker-flicker": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "ticker-flicker": "ticker-flicker 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [animate, typography],
};

export default config;
