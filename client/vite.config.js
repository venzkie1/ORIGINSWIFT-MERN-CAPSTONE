export default defineConfig({
  build: {
    rollupOptions: {
      input: 'client/index.html',
      output: {
        dir: 'dist',
        format: 'es',
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
      },
    },
  },
});
