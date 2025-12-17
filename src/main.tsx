import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { LoaderProvider } from './components/loader.tsx';
import { HelmetProvider } from "react-helmet-async";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <LoaderProvider>
      <HelmetProvider>
      <App />
      </HelmetProvider>
    </LoaderProvider>
    </BrowserRouter>
  </StrictMode>
);
