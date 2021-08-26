import React, { useState } from 'react';

const Landing = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleLoginSubmit = () => {
      setLoggedIn(true);
  }


  return (
    <div>
      <h2>Landing Page</h2>
      <form>
        <label className="hidden" htmlFor="username">Username</label>
        <input id="username" type="text" value={username} placeholder="username"
        onChange={(event) => setUsername(event.target.value)}/>
        <label className="hidden" htmlFor="password">Password</label>
        <input id="password" type="text" value={userPassword} placeholder="password"
        onChange={(event) => setUserPassword(event.target.value)}/>
      </form>  
        <button onClick={() => handleLoginSubmit()}>Submit</button>
    </div>

  )

}

export default Landing;