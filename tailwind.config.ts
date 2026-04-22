import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
      },
      fontSize: {
        'type-h3':      ['40px', { lineHeight: '1.1' }],
        'type-h4':      ['28px', { lineHeight: '1.1' }],
        'type-h5':      ['24px', { lineHeight: '1.1' }],
        'type-h6':      ['20px', { lineHeight: '1.1' }],
        'type-sub':     ['18px', { lineHeight: '1.3' }],
        'type-body':    ['16px', { lineHeight: '1.6' }],
        'type-small':   ['14px', { lineHeight: '1.6' }],
        'type-button':  ['20px', { lineHeight: '1'   }],
        'type-caption': ['12px', { lineHeight: '1.5' }],
        'type-tag':     ['10px', { lineHeight: '1'   }],
      },
      colors: {
        brand: {
          green: "#2CCEAC",
          dark: "#434343",
          footer: "#333333",
        },
      },
    },
  },
  plugins: [],
};
export default config;
