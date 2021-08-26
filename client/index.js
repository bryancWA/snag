import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './Nav.jsx';


ReactDOM.render(
  <Router>
    <App/>
  </Router>,
  document.getElementById('app'));