import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import "./styles/style.css";
import "./styles/output.css";
import reportWebVitals from './reportWebVitals.js';

export * from "./utils/cn.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
