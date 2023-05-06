import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'client/index.html',
      },
    },
  },
  // add the output directory configuration below
  build: {
    outDir: 'dist',
  },
})
