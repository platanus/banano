module.exports = {
  '.bn-input': {
    '@apply w-full flex': {},
    '&__input': {
      '@apply py-3 px-3 w-full rounded-lg border border-gray-200 h-12': {},
      '&[disabled]': {
        '@apply bg-gray-100 opacity-75 cursor-not-allowed': {},
      },
      '&:focus': {
        colors: {
          '@apply outline outline-1 outline-varColor-600 border-varColor-600 ring-varColor-600': {},
        },
      },
      '&--icon-left': {
        '@apply pl-10': {},
      },
      '&--icon-right': {
        '@apply pr-10': {},
      },
      '&--prefix': {
        '@apply rounded-l-none': {},
      },
      '&--suffix': {
        '@apply rounded-r-none': {},
      },
      '&--error': {
        '@apply border border-red-300 text-red-700 ring-red-300 outline-red-300 !important': {},
      },
    },
    '&__icon-left': {
      '@apply absolute top-0 left-0 bottom-0 flex items-center justify-center w-10': {},
    },
    '&__icon-right': {
      '@apply absolute top-0 right-0 bottom-0 flex items-center justify-center w-10': {},
    },
    '&__prefix': {
      '@apply px-3 py-2 flex items-center justify-center flex-shrink-0  rounded-l-lg': {},
      '@apply bg-gray-50 border-gray-200 border border-r-0 text-gray-500': {},
    },
    '&__suffix': {
      '@apply px-3 py-2 flex items-center justify-center flex-shrink-0  rounded-r-lg': {},
      '@apply bg-gray-50 border-gray-200 border border-l-0 text-gray-500': {},
    },
  },
};
