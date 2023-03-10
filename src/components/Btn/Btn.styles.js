module.exports = (colors) => ({
  base: {
    '@apply items-center justify-center inline-flex': {},
    '@apply inline-flex': {},
  },
  '[disabled]': {
    '@apply opacity-60': {},
    '@apply cursor-not-allowed': {},
  },
  sizes: {
    sm: {
      '@apply text-sm': {},
      '@apply px-3 py-1.5': {},
    },
    md: {
      '@apply text-base': {},
      '@apply px-4 py-2': {},
    },
    lg: {
      '@apply text-lg': {},
      '@apply px-4 py-3': {},
    },
  },
  shapes: {
    circle: {
      '@apply rounded-full': {},
      '@apply !p-0 leading-tight': {},
      '.bn-btn--sizes-sm': {
        '@apply w-6 h-6': {},
      },
      '.bn-btn--sizes-md': {
        '@apply w-8 h-8': {},
      },
      '.bn-btn--sizes-lg': {
        '@apply w-12 h-12': {},
      },
    },
    pill: {
      '@apply rounded-full': {},
    },
    rounded: {
      '@apply rounded-md': {},
    },
  },
  variants: {
    default: {
      '@apply border border-solid': {},
      '@apply focus:outline-none focus:ring-2': {},
      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [color]: {
            [`@apply text-white bg-${color}-600`]: {},
            [`@apply border-${color}-600`]: {},
            [`@apply hover:bg-${color}-500 hover:border-${color}-500`]: {},
            [`@apply focus:ring-${color}-600`]: {},
          },
        }), {},
      ),
    },
    outline: {
      '@apply bg-transparent': {},
      '@apply border border-solid': {},
      '@apply focus:outline-none focus:ring-2': {},
      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [color]: {
            [`@apply text-${color}-600 bg-transparent`]: {},
            [`@apply border-${color}-600`]: {},
            [`@apply hover:bg-${color}-100`]: {},
            [`@apply focus:ring-${color}-600`]: {},
          },
        }), {},
      ),
    },
    'no-border': {
      '@apply text-base-600 bg-transparent': {},
      '@apply border border-transparent': {},
      '@apply focus:outline-none': {},
      ...colors.reduce(
        (styles, color) => ({
          ...styles,
          [color]: {
            [`@apply text-${color}-600 bg-transparent`]: {},
            [`@apply hover:text-${color}-400`]: {},
            [`@apply focus:text-${color}-400`]: {},
          },
        }), {},
      ),
    },
  },
});
