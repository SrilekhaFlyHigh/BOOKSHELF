// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// ); Already in GITHUB


import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for React 18+
import App from "./App";
import "./index.css";

// Use createRoot for rendering the application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
