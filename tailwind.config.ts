module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        white: '#FCFCFC',
        green_main: '#48AD83',
        grey: '#C2C9D3',
        grey_text: '#A3A3A3',
        green_light: '#7AC0A3',
        green_dark: '#3D8567',
        blue_main: '#005AAB',
        blue_light: '#499AE3',
        blue_dark: '#074A87',
        black: '#1C1C1C',
        grey_bg: '#EDF1F6',
        red_main: '#FF5959',
        red_dark: '#d43535',
        orange: '#F9AF42'
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '2.5xl': '1.653rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem'
      },
    }
  },
  variants: {},
  // plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
}