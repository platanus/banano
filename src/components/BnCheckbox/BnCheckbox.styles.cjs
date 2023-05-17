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
      '@apply mr-2 rounded border-gray-300': {},
      colors: {
        '@apply text-varColor-600': {},
        '@apply focus:outline-none focus:border-varColor-600 focus:ring-2 focus:ring-varColor-600': {},
      },
    },
  },
};
