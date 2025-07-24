import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'https://warrior.ge',  // შენი რეალური API სერვერი
        changeOrigin: true,
        secure: false,
        // შეგიძლია დააყენო ეს თუ გინდა რომ url შეიცვალოს
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
