/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'blue': {
        '100': '#B7D4FB',
        '200': '#9EC3F5',
        '300': '#84B1EF',
        '400': '#6BA0E9',
        '500': '#528FE2',
        '600': '#397EDC',
        '700': '#1F6CD6',
        'primary': '#065BD0'
      },
      'green': {
        100: '#BBDFD5',
        200: '#AFD7CB',
        300: '#A2CFC2',
        400: '#96C6B8',
        500: '#8ABEAE',
        600: '#7DB5A5',
        700: '#71AD9B',
        primary: '#65A492'
      },
      gray: {
        200: '#F2F2F2',
        300: '#C4C4C4',
        400: '#9B9B9B',
        500: '#777676',
        600: '#535252',
        700: '#2F2E2E',
      },
      white: '#FFFFFF',
      secondary: '#0B0A0A',
      alerts: {
        green: {
          100: '#D4F5E9',
          200: '#3DD598',
          300: '#00BC71'
        },
        yellow: {
          100: '#FEF3D9',
          200: '#FFC542',
          300: '#FFB100'
        },
        red: {
          100: '#FFE5E7',
          200: '#FF575F',
          300: '#FF1C26'
        }
      }
    },
    dropShadow: {
      small: '0px 8px 24px rgba(112, 144, 176, 0.15)',
      medium: '0px 16px 40px rgba(112, 144, 176, 0.15)',
      large: '0px 32px 60px rgba(112, 144, 176, 0.1)'
    },
    extend: {},
    'blue': '#71AD9B'
  },
  plugins: [],
}
