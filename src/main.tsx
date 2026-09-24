import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
// CSS is loaded by the bundler; TypeScript does not have a declaration for it.
// @ts-expect-error Bundler-provided CSS side-effect import.
import './index.css';

document.title = 'Công ty TNHH Đức Phong';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);