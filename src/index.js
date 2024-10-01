import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import the main stylesheet (tailwind styles)
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This tells React to render your app inside the "root" element in index.html
);
