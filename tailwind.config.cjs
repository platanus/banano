const banano = require('./src/tailwind/index.cjs');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [

    banano.tailwindPlugin({ colors: ['orange'] }),
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
  ],
};
