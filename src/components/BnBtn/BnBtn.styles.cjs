module.exports = {
  '.bn-btn': {
    '@apply items-center justify-center inline-flex': {},
    '@apply disabled:cursor-not-allowed': {},
    '&--sizes-xs': {
      '@apply text-xs': {},
      '@apply px-4 py-1.5': {},
    },
    '&--sizes-sm': {
      '@apply text-sm': {},
      '@apply px-6 py-1.5': {},
    },
    '&--sizes-md': {
      '@apply text-base': {},
      '@apply px-6 py-2': {},
    },
    '&--sizes-lg': {
      '@apply text-base': {},
      '@apply px-6 py-3': {},
    },
    '&--shapes-circle': {
      '@apply rounded-full': {},
      '@apply !p-0 leading-tight': {},
      '&-sm': {
        '@apply w-6 h-6': {},
      },
      '&-md': {
        '@apply w-8 h-8': {},
      },
      '&-lg': {
        '@apply w-10 h-10': {},
      },
    },
    '&--shapes-default': {
      '@apply rounded': {},
    },
    '&--shapes-pill': {
      '@apply rounded-full': {},
    },
    '&--shapes-square': {
      '@apply rounded-none': {},
    },
    '&--variants-default': {
      '@apply border border-solid': {},
      '@apply focus:outline-none focus:ring-4': {},
      colors: {
        '@apply disabled:bg-varColor-200 disabled:border-varColor-200': {},
        '@apply text-white bg-varColor-600': {},
        '@apply border-varColor-600': {},
        '@apply hover:bg-varColor-700 hover:border-varColor-700': {},
        '@apply focus:ring-varColor-200': {},
      },
    },
    '&--variants-outline': {
      '@apply bg-transparent': {},
      '@apply border border-solid': {},
      '@apply focus:outline-none focus:ring-4 focus:border-transparent': {},
      colors: {
        '@apply disabled:text-varColor-200 disabled:border-varColor-200 disabled:bg-transparent': {},
        '@apply text-varColor-600': {},
        '@apply border-varColor-600': {},
        '@apply hover:border-varColor-700 hover:text-varColor-700': {},
        '@apply focus:ring-varColor-200': {},
      },
    },
    '&--variants-no-border': {
      '@apply text-banano-base-600 bg-transparent': {},
      '@apply border border-transparent': {},
      '@apply focus:outline-none': {},
      colors: {
        '@apply disabled:text-varColor-200 disabled:bg-transparent disabled:border-transparent': {},
        '@apply text-varColor-600': {},
        '@apply hover:text-varColor-700': {},
        '@apply focus:text-varColor-700': {},
      },
    },
    '&__icon-left': {
      '@apply mr-2': {},
    },
    '&__content-and-loading-wrapper': {
      '@apply flex shrink-0 flex-row items-center': {},
    },
    '&__loading': {
      '@apply animate-spin ml-3': {},
      '&--no-content': {
        '@apply ml-0': {},
      },
      '&--sizes-xs': {
        '@apply w-4 h-4': {},
      },
      '&--sizes-sm': {
        '@apply w-5 h-5': {},
      },
      '&--sizes-md': {
        '@apply w-6 h-6': {},
      },
      '&--sizes-lg': {
        '@apply w-6 h-6': {},
      },
    },
    '&__loading-circle': {
      '@apply opacity-25': {},
    },
    '&__loading-arc': {
      '@apply opacity-75': {},
    },
    '&__icon-right': {
      '@apply ml-2': {},
    },
  },
};
