
/**
 * Frontend entry point.
 *
 * Initializes the React application and mounts it
 * into the HTML document.
 */

import "./styles/tokens.css";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
