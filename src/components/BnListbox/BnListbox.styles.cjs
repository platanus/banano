module.exports = {
  '.bn-listbox': {
    '&--disabled': {
      '.bn-listbox__listbox': {
        '@apply cursor-not-allowed bg-gray-100 opacity-75': {},
      },
    },
    '&__button': {
      '@apply flex h-12 w-full items-center truncate rounded-lg border border-gray-200 p-3 bg-banano-bg': {},
      '@apply text-banano-text-foreground': {},
      '@apply ui-open:outline-none focus:outline-none focus:ring ui-open:ring': {},
      '&--error': {
        '@apply border border-banano-error ring-banano-error/25 !important': {},
      },
      colors: {
        '@apply ui-open:border-varColor-600 focus:border-varColor-600': {},
        '@apply ui-open:ring-varColor-600/25 focus:ring-varColor-600/25': {},
      },
    },
    '&__tags': {
      '@apply overflow-hidden': {},
    },
    '&__tag': {
      '@apply ml-1 inline-flex rounded py-1 px-2': {},
      colors: {
        '@apply bg-varColor-100': {},
      },
    },
    '&__selected-value': {
      '@apply truncate': {},
    },
    '&__icon': {
      '@apply ml-auto h-6 w-6 shrink-0 text-gray-500': {},
    },
    '&__error-message': {
      '@apply text-banano-error text-sm px-4': {},
    },
    '&__placeholder': {
      '@apply text-banano-text-muted': {},
    },
  },
  // Separate class since it's teleported to body
  '.bn-listbox-options': {
    '@apply fixed max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white': {},
    '&__option': {
      '@apply flex h-12 items-center p-3 ui-selected:text-white hover:text-white': {},
      colors: {
        '@apply hover:bg-varColor-600 ui-selected:bg-varColor-600': {},
      },
    },
    '&__option-text': {
      '@apply truncate': {},
    },
    '&__selected-option-icon': {
      '@apply ml-auto h-3.5 w-4 shrink-0': {},
    },
  },
};
