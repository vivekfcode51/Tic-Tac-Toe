/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
    screens: {
      xs2: "375px",
      xs1: "390px",
      xs: "400px",
      xsm: "500px",
      sm: "640px",
      md: "800px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1836px",
    },
    extend: {
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        scaleIn: 'scaleIn 0.3s ease-out',
      },
      fontSize: {
        xs: "11px",
        xsm: "13.86px",
        sm: "16px",
        lg: "18px",
      },
    },
  },
  plugins: [],
}

