import { defineConfig } from 'vite';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [
    commonjs(),
  ],
  build: {
    lib: {
      entry: 'src/tailwind/index.js',
      name: 'Banano Tailwind',
      formats: ['umd'],
      fileName: 'tailwind',
    },
    outDir: 'dist/tailwind',
    rollupOptions: {
      external: ['tailwindcss/colors', 'tailwindcss/plugin'],
      output: {
        sourcemapExcludeSources: true,
      },
    },
  },
});
