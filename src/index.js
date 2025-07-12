import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importa o CSS global, incluindo Tailwind
import App from './App';
import reportWebVitals from './reportWebVitals'; // Pode remover se não for usar

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Se quiser medir a performance da sua app, pode usar reportWebVitals
// Para saber mais: https://bit.ly/CRA-vitals
reportWebVitals();
