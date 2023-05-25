module.exports = {
  '.bn-file-input': {
    '&--variants-default': {
      '.bn-file-input__wrapper': {
        '@apply form-input flex h-12 w-full items-center rounded-lg border border-gray-200 px-3 py-2 bg-banano-bg': {},
      },
    },
    '&--disabled': {
      '.bn-file-input__wrapper': {
        '@apply bg-gray-100 opacity-75 cursor-not-allowed': {},
      },
    },
    '&--custom': {
      '.bn-file-input__wrapper': {
        '@apply p-0 border-0 h-auto bg-banano-bg text-banano-text-foreground': {},
      },
    },
    '&--error': {
      '.bn-file-input__wrapper': {
        '@apply border border-banano-error !important': {},
      },
    },
    '&__input': {
      '@apply hidden': {},
    },
    '&__button': {
      '@apply mr-2 shrink-0 cursor-pointer': {},
    },
    '&__label': {
      '@apply w-full overflow-hidden text-sm text-banano-text-foreground': {},
    },
    '&__placeholder': {
      '@apply text-banano-text-muted': {},
    },
    '&__avatar': {
      '@apply flex h-20 w-20 select-none items-center justify-center': {},
      '@apply border border-dashed text-xl text-gray-500': {},
      '&--default': {
        '@apply rounded': {},
      },
      '&--circle': {
        '@apply rounded-full overflow-hidden': {},
      },
      '@apply disabled:bg-gray-100 disabled:opacity-75 disabled:cursor-not-allowed': {},
    },
    '&__error-message': {
      '@apply text-banano-error text-sm px-4': {},
    },
  },
};
