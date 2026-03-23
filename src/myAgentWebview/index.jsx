import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

createRoot(document.getElementById('myAgent-root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
