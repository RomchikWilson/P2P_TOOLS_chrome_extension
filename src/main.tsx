import './index.css'
import App from './App.tsx'
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
    <HashRouter>
        <AuthProvider>
        <App />
        </AuthProvider>
    </HashRouter>
    </React.StrictMode>
);
