import type { Config } from 'tailwindcss';

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        card: "var(--color-card)",
        muted: "var(--color-muted)",
        border: "var(--color-border)"
      },
      borderRadius: {
        lg: "var(--radius)"
      },
      boxShadow: {
        card: "var(--shadow-card)"
      }
    }
  },
  plugins: []
};

export default config;