module.exports = {
  baseComponentClass: '.bn-btn',
  baseStyle: {
    '@apply items-center justify-center inline-flex': {},
  },
  modifiers: {
    '&[disabled]': {
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
        '&.bn-btn--sizes-sm': {
          '@apply w-6 h-6': {},
        },
        '&.bn-btn--sizes-md': {
          '@apply w-8 h-8': {},
        },
        '&.bn-btn--sizes-lg': {
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
        colors: {
          '@apply text-white bg-varColor-600': {},
          '@apply border-varColor-600': {},
          '@apply hover:bg-varColor-500 hover:border-varColor-500': {},
          '@apply focus:ring-varColor-600': {},
        },
      },
      outline: {
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
      'no-border': {
        '@apply text-base-600 bg-transparent': {},
        '@apply border border-transparent': {},
        '@apply focus:outline-none': {},
        colors: {
          '@apply text-varColor-600 bg-transparent': {},
          '@apply hover:text-varColor-400': {},
          '@apply focus:text-varColor-400': {},
        },
      },
    },
  },
  elements: {
    loading: {
      '@apply animate-spin mr-3': {},
      '.bn-btn--sizes-sm &': {
        '@apply w-4 h-4': {},
      },
      '.bn-btn--sizes-md &': {
        '@apply w-5 h-5': {},
      },
      '.bn-btn--sizes-lg &': {
        '@apply w-6 h-6': {},
      },
      '&--no-content': {
        '@apply mr-0': {},
      },
    },
  },
};
