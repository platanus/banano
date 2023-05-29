module.exports = {
  '.bn-toggle': {
    '&__wrapper': {
      '@apply flex items-center': {},
    },
    '&--disabled': {
      '.bn-toggle__wrapper': {
        '@apply cursor-not-allowed opacity-75': {},
      },
    },
    '&--error': {
      '.bn-toggle__input': {
        '@apply border-banano-error': {},
      },
    },
    '&__toggle': {
      '@apply relative mr-2 h-6 w-12 cursor-pointer items-center justify-center': {},
    },
    '&__track': {
      '@apply absolute left-1/2 top-1/2 h-5 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-300': {},
    },
    '&__ball': {
      '@apply absolute h-6 w-6 rounded-full border bg-white shadow': {},
      '@apply transition-transform translate-x-0': {},
    },
    '&__input': {
      '@apply sr-only': {},
      '&:checked ~ .bn-toggle__ball': {
        '@apply translate-x-full': {},
      },
      '&:checked ~ .bn-toggle__track': {
        colors: {
          '@apply bg-varColor-500': {},
        },
      },
      '&:focus-visible ~ .bn-toggle__track': {
        colors: {
          '@apply ring-2 ring-offset-4 ring-varColor-500': {},
        },
      },
    },
    '&__error-message': {
      '@apply text-banano-error text-sm px-4': {},
    },
  },
};
