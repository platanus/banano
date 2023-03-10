module.exports = {
  '.bn-checkbox': {
    '@apply flex items-center': {},
    '&--error': {
      '@apply text-red-500': {},
      '.bn-checkbox__input': {
        '@apply border-red-500': {},
      },
    },
    '&__input': {
      '@apply mr-2 rounded border-gray-300': {},
      colors: {
        '@apply text-varColor-600': {},
        '@apply focus:outline focus:outline-1 focus:outline-varColor-600': {},
        '@apply focus:border-varColor-600 focus:ring-varColor-600': {},
      },
    },
  },
};
