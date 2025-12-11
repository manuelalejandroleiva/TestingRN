/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [],
    theme: {
      extend: {
        aspectRatio: {
          '16/9': '16/9',
        },
        colors: {
          'M3-sys-light-on-surface': 'var(--M3-sys-light-on-surface, #1D1B20)',
        },
        fontFamily: {
          'roboto': ['Roboto', 'sans-serif'],
        },
        letterSpacing: {
          'tighter': '0.5px',
        },
        lineHeight: {
          'tight': '1.42857',
        },
      },
    },
    plugins: [],
  }