module.exports = {
  '.bn-input': {
    '&__input': {
      '@apply py-3 px-3 w-full rounded-lg border border-gray-200': {},
      '&[disabled]': {
        '@apply bg-gray-100 opacity-75 cursor-not-allowed': {},
      },
      '&:focus': {
        colors: {
          '@apply outline outline-1 outline-varColor-600 border-varColor-600 ring-varColor-600': {},
        },
      },
    },
  },
};
