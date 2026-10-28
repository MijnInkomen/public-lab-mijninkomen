/**
 * Startpunt van het prototype. Laadt eerst de huisstijl (tokens),
 * dan de basis-stijlen, en zet daarna de App op de pagina.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tokens.css';
import './styles/base.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
