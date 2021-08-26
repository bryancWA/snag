import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App.jsx';
import UserProfile from './components/UserProfile.jsx';

const Nav = () => {
  const [resetWaterDataFlag, setResetWaterDataFlag] = useState(false);
  return (
    <div>

  
      <App resetWaterDataFlag={resetWaterDataFlag} setResetWaterDataFlag={setResetWaterDataFlag}/>


    </div>
  )
}

export default Nav;