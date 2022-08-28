import { defineConfig } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'
import pluginRewriteAll from 'vite-plugin-rewrite-all';

export const aliases = {
  '@': resolve(__dirname, './src'),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    pluginRewriteAll()
  ],
  resolve: {
      alias: aliases,
  },
})
