/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        pontano: ["Pontano Sans", "sans-serif"],
        purplepurse: ["Purple Purse", "cursive"], 
      },
      animation: {
        jump: "jump 2s ease-in-out infinite",
        zoom: "zoom 2s ease-in-out infinite",
      },
      keyframes: {
        jump: {
          "0%, 100%": {
            transform: "translateY(0)", 
          },
          "50%": {
            transform: "translateY(-20px)", 
          },
        },
        zoom: {
          "0%, 100%": {
            transform: "scale(1)", 
          },
          "50%": {
            transform: "scale(1.2)",
          },
        },
      },
    },
  },
  plugins: [],
};
