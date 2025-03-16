import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthContextProvider } from '../context/AuthContext.jsx';
import { SocketContextProvider } from '../context/SocketConext.jsx';
import { SettingsContextProvider } from '../context/SettingContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <SettingsContextProvider>
            <App />
          </SettingsContextProvider>
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode >
)
