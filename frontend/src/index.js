import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import "./styles/style.css";
import "./styles/output.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import reportWebVitals from './reportWebVitals.js';

const queryClient = new QueryClient();

export * from "./utils/cn.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
    <App />
      </QueryClientProvider>
  </React.StrictMode>
);
reportWebVitals();
