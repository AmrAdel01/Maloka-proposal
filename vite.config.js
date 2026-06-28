import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        if (warning.message.includes('Module level directives cause errors when bundled')) {
          return;
        }
        defaultHandler(warning);
      },
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          three: ['three'],
          vendor: ['react', 'react-dom', 'lucide-react', 'canvas-confetti'],
        },
      },
    },
  },
});
