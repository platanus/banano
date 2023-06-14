module.exports = {
  '.bn-modal': {
    '&__overlay': {
      '@apply fixed inset-0 bg-black/30': {},
    },
    '&__wrapper': {
      '@apply fixed inset-0 flex items-center justify-center': {},
    },
    '&__content': {
      '@apply relative w-full bg-white sm:max-w-sm sm:rounded': {},
      '&--full-screen-on-mobile': {
        '@apply h-full sm:h-auto': {},
      },
    },
    '&__close-button': {
      '@apply absolute top-0 right-0 ml-auto flex h-12 w-12': {},
      '@apply items-center justify-center text-gray-500 focus:outline-none': {},
    },
    '&__close-button-icon': {
      '@apply h-6 w-6': {},
    },
    '&__header': {
      '@apply flex flex-row border-b px-6 py-2 text-lg text-gray-800 font-semibold': {},
    },
    '&__body': {
      '@apply px-6 py-3 text-sm text-gray-600': {},
    },
  },
};
