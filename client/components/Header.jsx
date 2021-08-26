import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ resetWaterDataFlag, setResetWaterDataFlag, setOpenProfile }) => {
  return (
    
      <div id="header">
        <Link to="/"><i className="fas fa-undo header-style" onClick={() => setResetWaterDataFlag(true)}></i></Link>
        <h1 className="header-style"> Snag </h1>
        <Link to="/userprofile"><i className="fas fa-user-alt header-style" onClick={() => setOpenProfile(true)}></i></Link>
      </div>
  )
}

export default Header;