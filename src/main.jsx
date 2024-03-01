import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeModeProvider } from "./components/ThemeModeContext";
import ThemeProvider from './components/ThemeProvider';
import { UserProvider } from './features/UserManager/UserContext.jsx';
import { AuthProvider } from './features/AuthManager/AuthContext.jsx';

import './index.css'
import App from './App'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { PropertyProvider } from './features/PropertyManager/PropertyContext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeModeProvider>
      <ThemeProvider>
        <AuthProvider>
            
            <PropertyProvider>
            <UserProvider>
              
              <App />
              
            </UserProvider>
            </PropertyProvider>
        </AuthProvider>
      </ThemeProvider>
    </ThemeModeProvider>
  </React.StrictMode>,
)