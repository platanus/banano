module.exports = {
  '.bn-textarea': {
    '@apply w-full': {},
    '@apply py-3 px-3 rounded-lg border border-gray-200 text-banano-text-foreground bg-banano-bg': {},
    '@apply placeholder:text-banano-text-muted focus:outline-none focus:ring': {},
    '@apply disabled:bg-gray-100 disabled:opacity-75 disabled:cursor-not-allowed': {},
    colors: {
      '@apply focus:border-varColor-600 focus:ring-varColor-600/25': {},
    },
    '&--error': {
      '@apply border border-banano-error focus:ring-banano-error/25 !important': {},
    },
  },
};
