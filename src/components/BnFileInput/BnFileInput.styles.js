module.exports = {
  '.bn-file-input': {
    '&--variants-default': {
      '@apply form-input flex h-12 w-full items-center rounded-lg border border-gray-200 px-3 py-2': {},
    },
    '&--disabled': {
      '@apply bg-gray-100 opacity-75 cursor-not-allowed': {},
    },
    '&__input': {
      '@apply hidden': {},
    },
    '&__button': {
      '@apply mr-2 shrink-0 cursor-pointer': {},
    },
    '&__label': {
      '@apply truncate text-sm': {},
    },
    '&__placeholder': {
      '@apply text-gray-500': {},
    },
    '&__avatar': {
      '@apply flex h-20 w-20 select-none items-center justify-center': {},
      '@apply  border border-dashed text-xl text-gray-500': {},
      '&--default': {
        '@apply rounded': {},
      },
      '&--circle': {
        '@apply rounded-full overflow-hidden': {},
      },
      '&[disabled]': {
        '@apply bg-gray-100 opacity-75 cursor-not-allowed': {},
      },
    },
  },
};
