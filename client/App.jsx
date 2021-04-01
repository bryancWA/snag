import React, { useEffect, useState } from 'react';
import InputForm from './components/InputForm.jsx';
import axios from 'axios';
import Header from './components/Header.jsx';
import DataRender from './components/DataRender.jsx';
import InputModal from './components/InputModal.jsx';


const App = () => {
  const [waterData, setWaterData] = useState([]);
  const [openPortal, setOpenPortal] = useState(false);
  
  
  
  const getCoord = (zipCode) => {
    console.log(zipCode);
    axios.get(`/api/getcoordinates/${zipCode}`)
      .then((result) => {
        console.log(result);
        useCoord(result.data.results[0].geometry.location.lat, result.data.results[0].geometry.location.lng)
      })
      .catch((err) => {
        console.log('err in getCoord', err)
      });
  }
  
  const myCoord = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        useCoord(position.coords.latitude, position.coords.longitude);
      }, (err) => {
        console.log('error in geolocation', err);
      });
    } else {
      console.log('geolocation not supported');
    }
  }

  const waterDataConstructor = (data) => {
    let tempArr = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      obj.siteName = data[i].sourceInfo.siteName;
      obj.siteCode = data[i].sourceInfo.siteCode[0];
      obj.value = data[i].values[0].value[0].value;
      obj.variableName = data[i].variable.variableName;
      tempArr.push(obj);
    }
    setWaterData(tempArr);
  }

  const getWater = (wst, sth, est, nrth) => {
    axios.get(`/api/getwater/${wst}/${sth}/${est}/${nrth}`)
      .then((result) => {
        console.log('getwater result:', result.data.value);
        waterDataConstructor(result.data.value.timeSeries);
    
      })
      .catch((err) => {
        console.log('error in getWater', err);
      });
  }

  const useCoord = (lat, long) => {
    console.log(`lat: ${lat}, longitude: ${long}`);
    let west = long - .1;
    let south = lat - .1;
    let east = long + .1;
    let north = lat + .1;
    console.log(`west: ${west.toFixed(6)}, south: ${south.toFixed(6)}, east: ${east.toFixed(6)}, north: ${north.toFixed(6)}`);
    getWater(west.toFixed(6), south.toFixed(6), east.toFixed(6), north.toFixed(6));
  }

  // useEffect(() => setValueSelected(false), waterData);

  return (

    <div>
      <Header />
      <InputForm getCoord={getCoord} myCoord={myCoord}/>
      {waterData.length > 1 ? <DataRender openPortal={openPortal} setOpenPortal={setOpenPortal} waterData={waterData}/> : <div id="info-prompt"> Get Started By Entering A Location In The Box Above </div>}
      <InputModal waterData={waterData} openPortal={openPortal} setOpenPortal={setOpenPortal}/>
    </div>
  )
}

export default App;
