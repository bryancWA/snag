import React, { useState } from 'react';
import { Button } from '@material-ui/core';


const InputForm = ({ getCoord, myCoord, setQueryData }) => {
  const [userZip, setUserZip] = useState('');

  const handleSubmitClick = (event) => {
    event.preventDefault();
    getCoord(userZip);
    setQueryData(userZip);
    setUserZip('');
  }

  const handleUserLocation = () => {
    setUserZip('');
    myCoord();
  }

  return (
    <div id="location-input">  
      <h2> Get Water Data </h2>
      <form>
        <h4>Address</h4>
        <label htmlFor='zip-code' className='hidden-style'> Address </label>
        <input name='address' value={userZip} type='text' placeholder="123 Acme St., Wiley City, WA 00000"
        onChange={(event) => setUserZip(event.target.value)}/>
        <Button type="submit" onClick={(e) => handleSubmitClick(e)}> Submit </Button>
        <Button type="button" onClick={() => handleUserLocation()}> Use My Location </Button>
      </form>
      <div id="info-prompt"> Get Started By Entering A Location In The Box Above </div> 
    </div>
  )
}

export default InputForm;