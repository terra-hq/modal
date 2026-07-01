import { defineConfig } from 'vite';
import { resolve } from 'path';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

const targets = {
  core: {
    entry: resolve(__dirname, 'src/js/Modal.js'),
    name: 'Modal',
    fileName: (format) => `Modal.${format}.js`,
    emptyOutDir: true,
  },
  expand: {
    entry: resolve(__dirname, 'src/js/plugins/expand.js'),
    name: 'ModalExpand',
    fileName: (format) => `plugins/expand.${format}.js`,
    emptyOutDir: false,
  },
};

const target = targets[process.env.BUILD_TARGET || 'core'];

export default defineConfig({
    root,
    publicDir: 'public',
    plugins: [],
    build: {
      lib: {
        entry: target.entry,
        name: target.name,
        formats: ['es', 'umd'],
        fileName: target.fileName,
      },
      outDir,
      emptyOutDir: target.emptyOutDir,
      rolldownOptions: {
        output: {
          name: target.name,
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@js': resolve(__dirname, './src/js'),
        '@scss': resolve(__dirname, './src/scss'),
        '@assets': resolve(__dirname, './src/assets'),
      },
    },
});