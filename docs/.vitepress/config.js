import { defineConfig } from 'vitepress';

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
                  text: 'Classes and Components',
                  link: '/classes-and-components',
                },
                {
                  text: 'Colors',
                  link: '/colors',
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
              text: 'BnBtn',
              link: '/components/bn-btn',
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
});
