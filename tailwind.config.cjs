const banano = require('./src/tailwind/index.cjs');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './docs/**/*.{html,md,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
    banano.tailwindPlugin({ colors: ['lime'] }),
  ],
};
