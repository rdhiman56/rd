import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages project site: https://rdhiman56.github.io/rd/
// BASE_URL is injected as import.meta.env.BASE_URL for asset paths.
export default defineConfig({
  plugins: [react()],
  base: '/rd/',
})
