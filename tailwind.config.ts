module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-300': '#328AD8',
        'primary-500': '#005AAB',
        'primary-700': '#003B70',
        'secondary-500': '#48AD83',
        'secondary-700': '#3D8567',
        'neutral-100': '#EAECEE',
        'neutral-200': '#D1D6DC',
        'neutral-400': '#9399A1',
        'neutral-900' : '#1C1C1C',
        'success-500' : '#48AD83',
        'warning-500' : '#F9AF42',
        'error-500' : '#FF5959',
        'error-700' : '#D43535',
        'outline' : '#D1D6DC',
        'surface': '#FCFCFC',
        'surface-container' : '#EAECEE',
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
        orange_main: '#F9AF42'
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
      screen: {
        md: '768px'
      },
      transitionProperty: {
        width: 'width'
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "blink": {
          "0%, 100%": {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
        },
        "up-down": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-30px)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "blink": "blink 1s infinite",
        "up-down": "up-down 3s ease-in-out infinite",
      },
    }
  },
  variants: {},
  plugins: [require("tailwindcss-animate")]
  // plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
}
