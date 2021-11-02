import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton.jsx';

const Landing = ({ setLoggedIn }) => {
  // const [username, setUsername] = useState('');
  // const [userPassword, setUserPassword] = useState('');
  const [loginRedirect, setLoginRedirect] = useState(false);
  const [redirectString, setRedirectString] = useState('<Redirect to="/login />');

  // const { loginWithRedirect } = useAuth0();

  // const handleLoginSubmit = () => {
  //   console.log('handle log invoked');
  //   loginWithRedirect();
  //   setLoggedIn(true);
  // }

  return (
    <div>
      <h2>Click to Log in Below</h2>
      <LoginButton setLoggedIn={setLoggedIn}/>
      
    </div>

  )

}

export default Landing;

// <form>
//         <label className="hidden" htmlFor="username">Username</label>
//         <input id="username" type="text" value={username} placeholder="username"
//         onChange={(event) => setUsername(event.target.value)}/>
//         <label className="hidden" htmlFor="password">Password</label>
//         <input id="password" type="text" value={userPassword} placeholder="password"
//         onChange={(event) => setUserPassword(event.target.value)}/>
//       </form>  