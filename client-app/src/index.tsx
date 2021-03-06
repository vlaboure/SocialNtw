import React from 'react';
import ReactDOM from 'react-dom';
import './App/layout/styles.css';
import App from './App/layout/App';
import {BrowserRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import ScrollToTop from './App/layout/ScrollToTop'

ReactDOM.render(  
  <BrowserRouter>  
    <ScrollToTop/>      
      <App />
   
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
