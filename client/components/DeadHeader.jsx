import React from 'react';
import LoginButton from './LoginButton';

const DeadHeader = () => {
  return (
    <div id="header">
      <i className="fas fa-undo header-style"></i>
      <h1 className="header-style"> snag </h1>
      <i className="fas fa-user-alt header-style"></i>
      <div>
      <LoginButton />
      </div>
    </div>
  )
}

export default DeadHeader;