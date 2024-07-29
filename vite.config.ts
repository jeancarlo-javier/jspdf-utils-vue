// <reference types="vitest" />
import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [vuePlugin(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': `${process.cwd()}/src`
    }
  }
})
