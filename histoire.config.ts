import { defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';

export default defineConfig({
  setupFile: '/src/histoire.setup.ts',
  plugins: [
    // eslint-disable-next-line new-cap
    HstVue(),
  ],
});
