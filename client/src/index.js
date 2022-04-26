import React from 'react';
//import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

const container = document.getElementById('root'); //('app')
const root = createRoot(container);

// ReactDOM.render(
//   <Router>     
//     <App />          
//   </Router>,
//   document.getElementById('root')
// );
root.render(
  <Router>    
      <App />          
  </Router>
);

