/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          sky: '#EAF4FF',
          skyDeep: '#CFE6FB',
          offwhite: '#FAFBFC',
          indigo: '#2B3593',
          indigoDeep: '#1D2566',
          amber: '#F5A623',
          ink: '#1A1D2E',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
