import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App';
import { reportScheduler } from './lib/reportScheduler';
import { seoOptimizer } from './lib/seoOptimizer';
import { syncManager } from './lib/syncManager';

// Create a client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    },
  },
});

// Initialize systems
if (import.meta.env.PROD) {
  reportScheduler.start();
  seoOptimizer.start();

  // Log sync state changes in development
  if (import.meta.env.DEV) {
    syncManager.subscribe((state) => {
      console.log('Sync state:', state);
    });
  }
}

// Use createRoot for concurrent features
const container = document.getElementById('root');
const root = createRoot(container!);

// Render with StrictMode for development checks
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);