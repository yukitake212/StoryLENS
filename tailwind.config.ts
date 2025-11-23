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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "story-paper": "#f8f9fa",
        "story-ink": "#1a1a1a",
        "signal-red": "#cc0000",
        "system-gray": "#e9ecef",
      },
      fontFamily: {
        story: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        interface: ['-apple-system', 'BlinkMacSystemFont', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        data: ['"SFMono-Regular"', '"SF Mono"', 'Menlo', '"Courier New"', 'Courier', 'monospace'],
      },
      borderRadius: {
        'sharp': '0',
        'sharp-sm': '2px',
        'sharp-md': '4px',
      },
      transitionDuration: {
        'snappy': '150ms',
      },
    },
  },
  plugins: [],
};
export default config;

