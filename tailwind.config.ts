import type { Config } from 'tailwindcss';





const config: Config = {
  darkMode: ['class'],
  content: [
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-urbanist)'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        link: { selected: 'hsl(var(--link-selected))', border: 'hsl(var(--link-border))' },
        icon: {
          bg: 'hsl(var(--icon-bg))',
        },
        border: 'hsl(var(--border))',
        message: { DEFAULT: 'hsl(var(--message))', border: 'hsl(var(--message-border))' },
        input: { DEFAULT: 'hsl(var(--input))', border: 'hsl(var(--input-border))' },
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        number: 'hsl(var(--number))',
      },
      borderRadius: {
        lg: 'var(--radius)' /* 40px */,
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 8px)' /* 32px */,
        xs: 'calc(var(--radius) - 16px)' /* 24px */,
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
