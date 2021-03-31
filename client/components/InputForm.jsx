import React, { useState } from 'react';


const InputForm = ({ getCoord, myCoord }) => {
  const [userZip, setUserZip] = useState('');

  return (
    <form>
      <label htmlFor='zip-code' className='hidden-class'> Zip Code </label>
      <input name='zip-code' value={userZip} type='text' placeholder="zip code"
      onChange={(event) => setUserZip(event.target.value)}/>
      <button type="button" onClick={() => myCoord()}> Use My Location </button>
      <button type="button" onClick={() => getCoord(userZip)}> Submit </button>
    </form>
  )
}

export default InputForm;