import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/QuickTap/',   // ← اسم الـ repo بالظبط (case-sensitive)
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  }
})
