import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite start het prototype lokaal op (npm run dev).
export default defineConfig({
  plugins: [react()],
});
