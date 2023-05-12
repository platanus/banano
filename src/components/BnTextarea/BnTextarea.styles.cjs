module.exports = {
  '.bn-textarea': {
    '@apply w-full': {},
    '@apply py-3 px-3 rounded-lg border border-gray-200 text-banano-text-foreground bg-banano-bg': {},
    '@apply placeholder:text-banano-text-muted': {},
    '@apply disabled:bg-gray-100 disabled:opacity-75 disabled:cursor-not-allowed': {},
    colors: {
      '@apply focus:border-varColor-600 focus:ring-varColor-600': {},
    },
    '&--error': {
      '@apply border border-red-300 text-red-700 ring-red-300 !important': {},
    },
  },
};
