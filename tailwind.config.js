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
          // Logo navy + light sky (light mode surfaces / dark mode chrome)
          navy: '#001B48',
          navyDeep: '#000F2E',
          navyMid: '#002060',
          indigo: '#002060',
          indigoDeep: '#001538',
          white: '#FFFFFF',
          cloud: '#F4FAFF',
          sky: '#EAF4FF',
          skyDeep: '#CFE6FB',
          cyan: '#4DB8E8',
          cyanGlow: '#86D8FB',
          amber: '#F0C14D',
          ink: '#1A1D2E',
          offwhite: '#FAFBFC',
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
