/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        pontano: ['Pontano Sans', 'sans-serif'],
      },
      animation: {
        'jump': 'jump 2s ease-in-out infinite',
        'zoom':'zoom 2s ease-in-out infinite',
      },
      keyframes: {
        jump: {
          '0%, 100%': {
            transform: 'translateY(0)', // Starts at the normal position
          },
          '50%': {
            transform: 'translateY(-20px)', // Moves up 20px at the halfway point
          },
        },
        zoom: {
          '0%, 100%': {
            transform: 'scale(1)', // Normal size
          },
          '50%': {
            transform: 'scale(1.2)', // Zoom in (20% larger)
          },
        },
      },
    },
  },
  plugins: [],
}
