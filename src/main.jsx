import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import { RoleProvider } from "./context/RoleProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RoleProvider>
        <App />
      </RoleProvider>
    </BrowserRouter>
  </StrictMode>
);
