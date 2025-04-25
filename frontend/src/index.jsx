import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Correct usage of createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
