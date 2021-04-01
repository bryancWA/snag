import axios from 'axios';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';




const InputModal = ({ openPortal, setOpenPortal, waterData }) => {
  const [userName, setUserName] = useState('');
  const [siteName, setSiteName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [unitName, setUnitName] = useState('');
  const [userActivity, setUserActivity] = useState('');

  const clearData = () => {
    setOpenPortal(false)
    setUserName('');
    setSiteName('');
    setInputValue('');
    setUnitName('');
    setUserActivity('');
  }

  const submitRecord = (usrnm, stnm, val, untnm, uact) => {
    let obj = {};
    obj.username = usrnm;
    obj.sitename = stnm;
    obj.value = val;
    obj.unitname = untnm;
    obj.activity = uact;
    axios.post('/api/userinput', obj)
      .then(() => clearData())
      .catch((err) => {
        console.log('error client side post', err);
      })
  }

  const MODAL_STYLE = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: '300px',
    height: '250px',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#f4f9f9',
    padding: '50px',
    zIndex: 1000,
    overflow: 'scroll',
  };

  const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0, .35)',
    zIndex: 1000,
  };
  
  if(!openPortal) {
    return null;
  } else {
    return ReactDOM.createPortal(
      <div>
        <div style={OVERLAY_STYLES} onClick={() => clearData()}></div>
        <div style={MODAL_STYLE}>
          <form>
            <label htmlFor="username" className="hidden-style">Username</label>
            <input name="username" type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/>
            <label htmlFor="sitename" className="hidden-style">Site Name</label>
            <select name="sitename" onChange={(e) => setSiteName(e.target.value)}>
              <option>Select Site Name</option>
              {waterData.map((site, index) => (
              <option value={site.siteName}> {site.siteName} </option>
              ))}
            </select>
            <label htmlFor="value" className="hidden-style">Value</label>
            <input name="value" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
            <label htmlFor="unitName" className="hidden-style">Unit Name</label>
            <select name="unitName" onChange={(e) => setUnitName(e.target.value)}>
              <option> Select A Unit of Measuerment </option>
              <option value="ft/s">{`ft/s (discharge)`}</option>
              <option value="ft">{`ft (height)`}</option>
            </select>
            <label htmlFor="activity" className="hidden-style">Activity</label>
            <select name="activity" onChange={(e) => setUserActivity(e.target.value)}>
              <option>Select an Activity</option>
              <option value="Fishing">Fishing</option>
            </select>
          </form>
          <button type="button" onClick={() => submitRecord(userName, siteName, inputValue, unitName, userActivity)}>Submit Record</button>
          <button type="button" onClick={() => clearData()}>Close Modal</button>
        </div>
      </div>, document.getElementById('portal')

    );
  }
}

export default InputModal;