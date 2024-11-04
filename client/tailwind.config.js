/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    backgroundImage:{
      "hero-overlay": "url('./src/images/overlay.svg') no-repeat center / cover",
    },
    flex: {
      "third": "0 0 33.333%",
      "half": "0 1 50%"
    },
    fontFamily: {
      "clashDisplay": ['"ClashDisplay"'],
      "roboto": ['"Roboto"']
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: '768px',
        md: '991px',
        lg: '1120px',
        xl: '1300px',
      },
    },
    extend: {
      colors: {
        "primary": "#2D1312",
        "secondary": "#36392D"
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}