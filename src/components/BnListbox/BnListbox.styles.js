module.exports = {
  '.bn-listbox': {
    '&--disabled': {
      '@apply cursor-not-allowed bg-gray-100 opacity-75': {},
    },
    '&__button': {
      '@apply flex h-12 w-full items-center truncate rounded-lg border border-gray-200 p-3': {},
      '@apply ui-open:outline ui-open:outline-1': {},
      colors: {
        '@apply ui-open:border-varColor-600 ui-open:outline-varColor-600 ui-open:ring-varColor-600': {},
      },
    },
    '&__options': {
      '@apply max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white mt-1': {},
    },
    '&__option': {
      '@apply flex h-12 items-center p-3 hover:text-white ui-selected:text-white': {},
      colors: {
        '@apply hover:bg-varColor-600 ui-selected:bg-varColor-600': {},
      },
    },
  },
};
