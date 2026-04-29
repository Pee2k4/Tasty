// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { CartProvider } from './context/CartContext.jsx'; // 1. CartProvider ở ngoài
import { AuthProvider } from './context/AuthContext.jsx'; // 2. AuthProvider ở trong
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <CartProvider> {/* Đảo CartProvider ra ngoài */}
          <AuthProvider> {/* Đảo AuthProvider vào trong */}
            <App />
          </AuthProvider>
        </CartProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);