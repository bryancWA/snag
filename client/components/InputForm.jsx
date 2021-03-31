import React, { useState } from 'react';


const InputForm = ({ getCoord, myCoord, setValueSelected }) => {
  const [userZip, setUserZip] = useState('');

  return (
    <div id="location-input">  
      <h2> Get Water Data </h2>
      <form>
        <label htmlFor='zip-code' className='hidden-class'> Address </label>
        <input name='address' value={userZip} type='text' placeholder="123 Acme St., Wiley City, WA 00000"
        onChange={(event) => setUserZip(event.target.value)}/>
        <button type="button" onClick={() => getCoord(userZip)}> Submit </button>
        <button type="button" onClick={() => myCoord()}> Use My Location </button>
      </form>
    </div>
  )
}

export default InputForm;