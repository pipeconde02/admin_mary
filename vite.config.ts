import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/xadmin/',  // Cambiar aquí para apuntar a la subruta
  plugins: [react()],
  define: { 'process.env': {}, },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
