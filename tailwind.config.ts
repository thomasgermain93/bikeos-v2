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
        // Backgrounds exacts raceos.ai
        'bg-primary': '#0a0a0a',
        'bg-header': 'rgba(9, 9, 11, 0.95)',
        'bg-card': '#18181b',
        'bg-card-hover': 'rgba(39, 39, 42, 0.4)',
        'bg-nav-active': 'rgba(255, 255, 255, 0.08)',
        'bg-nav-hover': 'rgba(255, 255, 255, 0.05)',
        'bg-fl': 'rgba(39, 39, 42, 0.2)',
        
        // F1 / WEC colors
        'f1-red': '#ef4444',
        'f1-bg': '#ef444418',
        'wec-blue': '#3b82f6',
        'wec-bg': '#3b82f618',
        
        // Text colors
        'zinc': {
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        
        // Violet for fastest lap
        'violet': {
          400: '#a78bfa',
          500: '#8b5cf6',
        },
        
        // Team colors F1
        'redbull': '#3671C6',
        'mclaren': '#FF8000',
        'ferrari': '#FF2800',
        'mercedes': '#27F4D2',
        'alpine': '#0093CC',
        'astonmartin': '#229971',
        'haas': '#B6BABD',
        'racingbulls': '#6692FF',
        'williams': '#64C4FF',
        'kicksauber': '#52E252',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      maxWidth: {
        '6xl': '72rem', // 1152px exact
      },
      borderRadius: {
        'xl': '12px',
        'md': '6px',
      },
      transitionDuration: {
        '150': '150ms',
      },
    },
  },
  plugins: [],
};
export default config;
