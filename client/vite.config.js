import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'client/main.jsx',
      },
    },
  },
  build: {
    outDir: 'dist',
  },
})
