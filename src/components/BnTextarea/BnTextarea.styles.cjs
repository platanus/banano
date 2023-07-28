module.exports = {
  '.bn-textarea': {
    '&__textarea': {
      '@apply w-full': {},
      '@apply py-3 px-3 rounded-lg border border-gray-200 text-banano-text-foreground bg-banano-bg': {},
      '@apply placeholder:text-banano-text-muted focus:outline-none focus:ring': {},
      '@apply disabled:bg-gray-100 disabled:opacity-75 disabled:cursor-not-allowed': {},
      '&--error': {
        '@apply border-banano-error focus:ring-banano-error/25 !important': {},
      },
      colors: {
        '@apply focus:border-varColor-600 focus:ring-varColor-600/25': {},
      },
    },
    '&__error-message': {
      '@apply text-banano-error text-sm px-4': {},
    },
  },
};
