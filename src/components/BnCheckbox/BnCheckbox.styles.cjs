module.exports = {
  '.bn-checkbox': {
    '@apply flex items-center': {},
    '&--disabled': {
      '@apply cursor-not-allowed opacity-75': {},
    },
    '&--error': {
      '@apply text-banano-error !important': {},
      '.bn-checkbox__input': {
        '@apply border-banano-error focus:ring-banano-error !important': {},
      },
    },
    '&__input': {
      '@apply mr-2 rounded border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0': {},
      '@apply focus-visible:ring-offset-2 focus-visible:ring-2': {},
      colors: {
        '@apply text-varColor-600': {},
        '@apply focus-visible:border-varColor-600 focus-visible:ring-varColor-600': {},
      },
    },
  },
};
