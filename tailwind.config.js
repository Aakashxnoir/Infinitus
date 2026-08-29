/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Light surfaces (previous light UI)
          sky: '#EAF4FF',
          skyDeep: '#CFE6FB',
          offwhite: '#FAFBFC',
          cloud: '#F4FAFF',
          // Dark chrome (header / footer / loader curtain)
          navyDeep: '#000F2E',
          // Dark body surface — lighter than chrome for separation
          navyBody: '#0A274F',
          navy: '#001B48',
          navyMid: '#002060',
          // Previous-commit light curtain + accents
          indigo: '#2B3593',
          indigoDeep: '#1D2566',
          white: '#FFFFFF',
          cyan: '#4DB8E8',
          cyanGlow: '#86D8FB',
          amber: '#F0C14D',
          ink: '#1A1D2E',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      borderRadius: {
        card: '1.75rem',
      },
    },
  },
  plugins: [],
};
