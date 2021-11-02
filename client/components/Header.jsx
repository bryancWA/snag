import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

const Header = ({ resetWaterDataFlag, setResetWaterDataFlag, setLoggedIn, loggedIn }) => {
  const [redirectLink, setRedirectLink] = useState(false);

  const { isAuthenticated } = useAuth0();

  const handleRedirect = () => {
    setRedirectLink(true);
    // setLoggedIn(true);

  }

  return (
    
      <div id="header">
        <Link to="/"><i className="fas fa-undo header-style" onClick={() => setResetWaterDataFlag(true)}></i></Link>
        <h1 className="header-style"> snag </h1>
        <Link to="/profile"><i className="fas fa-user-alt header-style"></i></Link>
        <div>
          {!isAuthenticated ?
            <div>
              {!redirectLink ? <h5 onClick={() => handleRedirect()}>Login</h5> : <Redirect to="/login"/>}
            </div>
            : <LogoutButton />}
        </div>
      </div>
  )
}

export default Header;