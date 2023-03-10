import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Banano',
  themeConfig: {
    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          items: [
            {
              text: 'Introduction',
              link: '/getting-started',
            },
            {
              text: 'Theme Customization',
              link: '/theme-customization',
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
