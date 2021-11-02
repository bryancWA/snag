import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';


ReactDOM.render(
  <Auth0Provider
  domain="dev-iux4ijtt.us.auth0.com"
  clientId="PIntLP4O4nozopveetwHKFyBeN1lTcUN"
  redirectUri='http://localhost:3000'>
    
      <App/>
    
    </Auth0Provider>,
  document.getElementById('app'));