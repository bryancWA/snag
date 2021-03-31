import React from 'react';
import InputForm from './components/InputForm.jsx';
import axios from 'axios';


const App = () => {
  
  
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
  const getWater = (wst, sth, est, nrth) => {
    axios.get(`/api/getwater/${wst}/${sth}/${est}/${nrth}`)
      .then((result) => {
        console.log('getwater result:', result.data);
    
      })
      .catch((err) => {
        console.log('error in getWater', err);
      });
  }

  const useCoord = (lat, long) => {
    console.log(`lat: ${lat}, longitude: ${long}`);
    let west = long;
    let south = lat;
    let east = long + .2;
    let north = lat + .2;
    console.log(`west: ${west.toFixed(6)}, south: ${south.toFixed(6)}, east: ${east.toFixed(6)}, north: ${north.toFixed(6)}`);
    getWater(west.toFixed(6), south.toFixed(6), east.toFixed(6), north.toFixed(6));
  }

  
  return (
    <div>
      <InputForm getCoord={getCoord} myCoord={myCoord}/>
    </div>
  )
}

export default App;
