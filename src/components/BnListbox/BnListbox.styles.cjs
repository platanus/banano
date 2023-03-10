module.exports = {
  '.bn-listbox': {
    '&--disabled': {
      '@apply cursor-not-allowed bg-gray-100 opacity-75': {},
    },
    '&__button': {
      '@apply flex h-12 w-full items-center truncate rounded-lg border border-gray-200 p-3': {},
      '@apply ui-open:outline ui-open:outline-1': {},
      '&--error': {
        '@apply border border-red-300 text-red-700 ring-red-300 outline-red-300 !important': {},
      },
      colors: {
        '@apply ui-open:border-varColor-600 ui-open:outline-varColor-600 ui-open:ring-varColor-600': {},
      },
    },
    '&__tag': {
      '@apply ml-1 inline-flex rounded py-1 px-2': {},
      colors: {
        '@apply bg-varColor-100': {},
      },
    },
    '&__error-message': {
      '@apply text-sm text-red-600': {},
    },
  },
  // Separate class since it's teleported to body
  '.bn-listbox-options': {
    '@apply fixed max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white': {},
    '&__option': {
      '@apply flex h-12 items-center p-3 ui-selected:text-white': {},
      colors: {
        '@apply hover:bg-varColor-600 ui-selected:bg-varColor-600': {},
      },
    },
  },
};
