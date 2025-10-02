import React from 'react'; // Necesario para usar React.StrictMode
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = createRoot(document.getElementById('root')!);

//  Mejora: Envuelve <App /> con React.StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);