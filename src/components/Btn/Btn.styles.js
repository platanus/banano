module.exports = {
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
      '@apply text-base-100 bg-base-600': {},
      '@apply border border-solid border-base-600': {},
      /* hover */
      '@apply hover:bg-base-500  hover:border-base-500': {},
      /* focus */
      '@apply focus:outline-none focus:ring-2 focus:ring-base-600': {},
    },
    outline: {
      '@apply text-base-600 bg-transparent': {},
      '@apply border border-solid border-base-600': {},
      /* hover */
      '@apply hover:bg-base-100': {},
      /* focus */
      '@apply focus:outline-none focus:ring-2 focus:ring-base-600': {},
    },
  },
};
