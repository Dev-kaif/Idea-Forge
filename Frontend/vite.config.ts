import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Replace with your desired port
    strictPort: true, // Fail if the port is already in use
    host: 'localhost', // Set to '0.0.0.0' for external access
    open: true, // Automatically open the browser
  },
});

