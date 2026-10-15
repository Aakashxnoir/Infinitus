/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Theme tokens — values live in styles/globals.css (:root = light, .dark = dark)
        bg: token('bg'),
        'bg-2': token('bg-2'),
        card: token('card'),
        fg: token('fg'),
        muted: token('muted'),
        accent: token('accent'),
        'accent-2': token('accent-2'),
        gold: token('gold'),
        'btn-bg': token('btn-bg'),
        'btn-fg': token('btn-fg'),
      },
      fontFamily: {
        heading: ['var(--font-serif)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
