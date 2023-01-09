import { StyledEngineProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contenxt/auth-content';
import { UserProvider } from './contenxt/user-context';
import { CartProvider } from "react-use-cart";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AuthProvider>
            <UserProvider>
                <StyledEngineProvider injectFirst>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </StyledEngineProvider>
            </UserProvider>
        </AuthProvider>
    </BrowserRouter>
);
