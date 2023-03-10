require('@rushstack/eslint-patch/modern-module-resolution');
const platanusRules = require('./.eslint/platanus-rules.cjs');

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/eslint-config-typescript',
    'plugin:tailwindcss/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: ['import', 'tailwindcss'],
  rules: {
    ...platanusRules,
  },
  overrides: [
    {
      files: ['*.ts', '*.vue'],
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'tailwindcss/no-custom-classname': 'off',
      },
    },
  ],
};
