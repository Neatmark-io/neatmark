import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from './App.tsx'
import "./index.css";

/**
 * The root component that renders the application.
 * It uses createRoot to mount the application into the DOM element with the ID 'root'.
 * StrictMode is used for development to identify potential problems in the application.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
