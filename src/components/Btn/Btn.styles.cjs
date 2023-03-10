module.exports = {
  '.bn-btn': {
    '@apply items-center justify-center inline-flex': {},
    '@apply disabled:opacity-60 disabled:cursor-not-allowed': {},
    '&--sizes-xs': {
      '@apply text-xs': {},
      '@apply px-3 py-1.5': {},
      '.bn-btn__loading': {
        '@apply w-4 h-4': {},
      },
    },
    '&--sizes-sm': {
      '@apply text-sm': {},
      '@apply px-3 py-1.5': {},
      '.bn-btn__loading': {
        '@apply w-4 h-4': {},
      },
    },
    '&--sizes-md': {
      '@apply text-base': {},
      '@apply px-4 py-2': {},
      '.bn-btn__loading': {
        '@apply w-5 h-5': {},
      },
    },
    '&--sizes-lg': {
      '@apply text-lg': {},
      '@apply px-6 py-3': {},
      '.bn-btn__loading': {
        '@apply w-6 h-6': {},
      },
    },
    '&--shapes-circle': {
      '@apply rounded-full': {},
      '@apply !p-0 leading-tight': {},
      '&.bn-btn--sizes-sm': {
        '@apply w-6 h-6': {},
      },
      '&.bn-btn--sizes-md': {
        '@apply w-8 h-8': {},
      },
      '&.bn-btn--sizes-lg': {
        '@apply w-10 h-10': {},
      },
    },
    '&--shapes-pill': {
      '@apply rounded-full': {},
    },
    '&--shapes-rounded': {
      '@apply rounded-lg': {},
    },
    '&--variants-default': {
      '@apply border border-solid': {},
      '@apply focus:outline-none focus:ring-2': {},
      colors: {
        '@apply text-white bg-varColor-600': {},
        '@apply border-varColor-600': {},
        '@apply hover:bg-varColor-500 hover:border-varColor-500': {},
        '@apply focus:ring-varColor-600': {},
      },
    },
    '&--variants-outline': {
      '@apply bg-transparent': {},
      '@apply border border-solid': {},
      '@apply focus:outline-none focus:ring-2': {},
      colors: {
        '@apply text-varColor-600 bg-transparent': {},
        '@apply border-varColor-600': {},
        '@apply hover:bg-varColor-100': {},

        '@apply focus:ring-varColor-600': {},
      },
    },
    '&--variants-no-border': {
      '@apply text-base-600 bg-transparent': {},
      '@apply border border-transparent': {},
      '@apply focus:outline-none': {},
      colors: {
        '@apply text-varColor-600 bg-transparent': {},
        '@apply hover:text-varColor-400': {},

        '@apply focus:text-varColor-400': {},
      },
    },
    '&__loading': {
      '@apply animate-spin mr-3': {},
      '&--no-content': {
        '@apply mr-0': {},
      },
    },
  },
};
