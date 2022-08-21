import { defineConfig } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'

export const aliases = {
  '@': resolve(__dirname, './src'),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
      alias: aliases,
  },
})
