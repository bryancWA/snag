import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = ({ setLoggedIn }) => {
   
  const { loginWithRedirect } = useAuth0();
  
  // const handleLoginSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('handle log invoked');
  //   loginWithRedirect();
  //   setLoggedIn(true);
  // }

  return (
    <button onClick={(e) => loginWithRedirect()}>Login</button>
  )

}

export default LoginButton;