import { defineConfig } from 'vitepress';

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
          ],
        },
      ],
    },
  },
});
