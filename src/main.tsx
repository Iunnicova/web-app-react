import React, { StrictMode } from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root') as HTMLElement | null; // Типизация для TypeScript

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Root element with id 'root' not found in the document.");
}