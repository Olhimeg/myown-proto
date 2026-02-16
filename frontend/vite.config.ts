import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Если часто используешь компоненты или utils — добавь
      // '@/components': path.resolve(__dirname, './src/components'),
      // '@/utils': path.resolve(__dirname, './src/utils'),
    },
  },

  server: {
    // Порт фиксируем явно — чтобы не зависеть от того, свободен ли 5173
    port: 5173,
    open: true,             // браузер откроется автоматически
    strictPort: true,       // если порт занят — Vite упадёт, а не выберет другой

    proxy: {
      '/api': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },

      '/ws': {
        target: 'ws://localhost:8001',   // или wss:// если у тебя https на бэке
        ws: true,                        // ← ключевой флаг для WebSocket
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ws/, ''),  // если нужно убрать префикс
        secure: false,
      },
    },

    // Полезно для HMR (hot module replacement) — иногда помогает при проблемах
    hmr: {
      clientPort: 5173,
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: true,              // для прод-отладки

    rollupOptions: {
      output: {
        // Разделяем vendor-бандл — ускоряет загрузку и кэширование
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
          ui: ['@/components/ui'], // если Shadcn/UI много — можно вынести
        },
      },
    },
  },

  // Оптимизация CSS (Tailwind уже через плагин, но можно добавить)
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },

  // Если нужно — можно добавить envPrefix или define
  // define: {
  //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  // },
})