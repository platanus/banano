const banano = require('./src/tailwind');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    banano.tailwindPlugin({ colors: ['orange'] }),
  ],
};
