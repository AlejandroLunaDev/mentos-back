/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135.3deg, #AA5BFF 24.87%, #F317FF 132.39%)',
        'gradient-secondary': 'linear-gradient(135.3deg, #FFB35B 24.87%, #F317FF 132.39%)',
        'gradient-tertiary': 'linear-gradient(135.3deg, #F317FF 24.87%, #AA5BFF 132.39%)',
        
      },
      colors: {
        'transparent': 'transparent',
        'blanco': '#ffffff',
        'blancoVioleta': '#FFCAFB',
        'gris': '#545557',
        'violeta': '#AA5BFF',
        'violeta2': '#F317FF',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
    },
  },

  variants: {
    backdropFilter: ['responsive'], 
  },
  plugins: [
    require('tailwindcss-filters'),
    'prettier-plugin-tailwindcss',
  ],

};
