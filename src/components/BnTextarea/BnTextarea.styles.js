module.exports = {
  '.bn-textarea': {
    '@apply w-full': {},
    '&__input': {
      '@apply py-3 px-3 w-full rounded-lg border border-gray-200': {},
      '&[disabled]': {
        '@apply bg-gray-100 opacity-75 cursor-not-allowed': {},
      },
      '&:focus': {
        colors: {
          '@apply border-varColor-600 ring-varColor-600': {},
        },
      },
      '&--error': {
        '@apply border border-red-300 text-red-700 ring-red-300 !important': {},
      },
    },
    '&__error-message': {
      '@apply text-sm text-red-600': {},
    },
  },
};
