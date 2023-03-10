import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    vue(),
  ],
  build: {
    sourcemap: true,
    target: 'esnext',
    minify: false,
    lib: {
      entry: 'src/lib/index.ts',
      name: 'Banano',
      formats: ['es'],
      fileName: 'index',
    },
    outDir: 'dist/vue',
    rollupOptions: {
      external: ['vue'],
      output: {
        sourcemapExcludeSources: true,
      },
    },
  },
});
