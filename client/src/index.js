import React from 'react';
//import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import App from './App';
import './index.css';

const container = document.getElementById('root'); //('app')
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Router>    
        <App />          
    </Router>
  </Provider>
);