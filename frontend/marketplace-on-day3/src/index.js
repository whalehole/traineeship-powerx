import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Marketplace from './pages/marketplace';
import { AuthProvider } from './lib/auth.state';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Marketplace />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

