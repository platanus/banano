import { defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';

export default defineConfig({
  vite: {
    base: process.env.HISTOIRE_BASE || '/',
  },
  routerMode: 'hash',
  setupFile: '/src/histoire.setup.ts',
  plugins: [
    // eslint-disable-next-line new-cap
    HstVue(),
  ],
});
