import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

const loadBackendResponse = async () => {
  try {
    const response = await axios.get('http://localhost:8080/db-status');
    console.log('Backend and frontend are communicating:', response.data);
  } catch (error) {
    console.error('Error communicating with the backend:', error);
  }
};

loadBackendResponse();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();