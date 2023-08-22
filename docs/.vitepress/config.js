import { defineConfig } from 'vitepress';
import { whyframe } from '@whyframe/core';
import { whyframeVue } from '@whyframe/vue';

const h2 = 2;
const h3 = 3;

export default defineConfig({
  title: 'Banano',
  base: '/banano/',
  themeConfig: {
    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          items: [
            {
              text: 'Introduction',
              link: '/',
            },
            {
              text: 'Theme Customization',
              link: '/theme-customization',
              collapsed: false,
              items: [
                {
                  text: 'Colors',
                  link: '/colors',
                },
                {
                  text: 'Classes and Components',
                  link: '/classes-and-components',
                },
              ],
            },
            {
              text: 'Localization',
              link: '/localization',
            },
            {
              text: 'Histoire (Component Library)',
              link: 'https://platanus.github.io/banano/histoire/',
            },
          ],
        },
        {
          text: 'Components',
          items: [
            {
              text: 'BnBtn',
              link: '/components/bn-btn',
            },
            {
              text: 'BnInput',
              link: '/components/bn-input',
            },
            {
              text: 'BnFileInput',
              link: '/components/bn-file-input',
            },
            {
              text: 'BnCheckbox',
              link: '/components/bn-checkbox',
            },
            {
              text: 'BnListbox',
              link: '/components/bn-listbox',
            },
            {
              text: 'BnModal',
              link: '/components/bn-modal',
            },
            {
              text: 'BnPagination',
              link: '/components/bn-pagination',
            },
            {
              text: 'BnTextarea',
              link: '/components/bn-textarea',
            },
            {
              text: 'BnToggle',
              link: '/components/bn-toggle',
            },
          ],
        },
      ],
    },
    outline: [h2, h3],
  },
  vite: {
    plugins: [
      whyframe({
        defaultSrc: '/banano/frames/default', // provide our own html
      }),
      whyframeVue({
        include: /\.(?:vue|md)$/, // also scan in markdown files
      }),
    ],
  },
});
