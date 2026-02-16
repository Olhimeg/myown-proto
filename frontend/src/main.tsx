// src/main.tsx (или index.tsx)
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import './index.css';

// Создаём один экземпляр QueryClient (лучше делать глобально)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Настройки по умолчанию — можно менять под себя
      refetchOnWindowFocus: false,      // не перезагружать при возврате во вкладку
      retry: 1,                         // пытаться заново 1 раз при ошибке
      staleTime: 1000 * 30,             // данные свежие 30 секунд
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);