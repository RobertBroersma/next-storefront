module.exports = {
  purge: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      sans: ['Montserrat'],
      // sans: ['Jost'],
    },
    extend: {
      boxShadow: {
        outline: '0 0 0 4px rgb(102, 126, 234, 0.5)',
        'outline-dark': '0 0 0 4px rgb(0, 0, 0, 0.2)',
        'outline-light': '0 0 0 4px rgb(255, 255, 255, 0.2)',
      },
      spacing: {
        '2/3': '66.666667%',
      },
      animation: {
        '-translate-100': '-translate-100 30s linear infinite',
      },
      keyframes: {
        '-translate-100': {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(0, -50%, 0)' },
        },
      },
    },
  },
  variants: {
    backgroundColor: [
      'responsive',
      'hover',
      'focus',
      'disabled',
      'focus-within',
      'group-hover',
    ],
    textColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
    width: ['responsive', 'group-hover', 'group-focus'],
    translate: [
      'responsive',
      'hover',
      'focus',
      'active',
      'group-hover',
      'group-focus',
    ],
    scale: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    boxShadow: ['responsive', 'hover', 'focus', 'active', 'focus-within'],
  },
  plugins: [require('@tailwindcss/custom-forms')],
}
