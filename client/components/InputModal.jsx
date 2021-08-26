import axios from 'axios';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, MenuItem, Select, InputLabel, TextField } from '@material-ui/core';




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
            <h3>Username</h3>
            <InputLabel id="username" style={ {display: 'none'} }>Username</InputLabel>
            <TextField labelid="username" id="outlined-secondary" value={userName} onChange={(e) => setUserName(e.target.value)}/>
            <h3>Select Site Name </h3>
            <InputLabel id="sitename" style={ {display: 'none'} }>Site Name</InputLabel>
            <Select labelid="sitename" onChange={(e) => setSiteName(e.target.value)}>
              <MenuItem>Select Site Name</MenuItem>
              {waterData.map((site, index) => (
              <MenuItem key={index + site.siteCode} value={site.siteName}> {site.siteName} </MenuItem>
              ))}
            </Select>
            <h3> Ideal Water Measurement </h3>
            <InputLabel id="value" style={ {display: 'none'} }>Value</InputLabel>
            <TextField labelid="value" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
            <h3> Unit of Measurement </h3>
            <InputLabel id="unitName" style={ {display: 'none'} }>Unit Name</InputLabel>
            <Select labelid="unitName" onChange={(e) => setUnitName(e.target.value)}>
              <MenuItem> Select A Unit of Measuerment </MenuItem>
              <MenuItem value="ft/s">{`ft/s (discharge)`}</MenuItem>
              <MenuItem value="ft">{`ft (height)`}</MenuItem>
            </Select>
            <h3>Activity</h3>
            <InputLabel id="activity" style={ {display: 'none'} }>Activity</InputLabel>
            <Select labelid="activity" onChange={(e) => setUserActivity(e.target.value)}>
              <MenuItem>Select an Activity</MenuItem>
              <MenuItem value="Fishing">Fishing</MenuItem>
              <MenuItem value="Rafting">Rafting</MenuItem>
              <MenuItem value="Kayaking">Kayaking</MenuItem>
            </Select>
          </form>
          <Button type="button" onClick={() => submitRecord(userName, siteName, inputValue, unitName, userActivity)}>Submit Record</Button>
          <Button type="button" onClick={() => clearData()}>Close Modal</Button>
        </div>
      </div>, document.getElementById('portal')

    );
  }
}

export default InputModal;