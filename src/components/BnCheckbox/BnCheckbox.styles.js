module.exports = {
  '.bn-checkbox': {
    '@apply flex items-center': {},
    '&__input': {
      '@apply mr-2 rounded border-gray-300': {},
      colors: {
        '@apply text-varColor-600': {},
      },
      '&:focus': {
        colors: {
          '@apply outline outline-1 outline-varColor-600 border-varColor-600 ring-varColor-600': {},
        },
      },
    },
  },
};
