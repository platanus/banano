import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts(),
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
      fileName: 'banano',
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
