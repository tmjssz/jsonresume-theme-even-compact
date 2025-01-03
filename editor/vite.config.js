import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  return {
    build: {
      outDir: '../public',
      target: 'esnext',
    },
    base: '/jsonresume-theme-even-compact/',
    publicDir: false,
  }
})
