import React, { useEffect, useState } from 'react';
import InputForm from './components/InputForm.jsx';
import axios from 'axios';
import Header from './components/Header.jsx';
import DataRender from './components/DataRender.jsx';
import InputModal from './components/InputModal.jsx';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UserProfile from './components/UserProfile.jsx';
import Landing from './components/Landing.jsx';
import { useAuth0 } from '@auth0/auth0-react';
import DeadHeader from './components/DeadHeader.jsx';


const App = () => {
  const [waterData, setWaterData] = useState([]);
  const [openPortal, setOpenPortal] = useState(false);
  const [currentSearchParams, setCurrentSearchParams] = useState('');
  const [resetWaterDataFlag, setResetWaterDataFlag] = useState(false);
  const [queryData, setQueryData] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({'given_name': 'Bob'});
  
  const { user, isAuthenticated } = useAuth0();


  
  const getCoord = (zipCode) => {
    setCurrentSearchParams(zipCode);
    axios.get(`/api/getcoordinates/${zipCode}`)
      .then((result) => {
        console.log(result);
        useCoord(result.data.results[0].geometry.location.lat, result.data.results[0].geometry.location.lng);
      })
      .catch((err) => {
        console.log('err in getCoord', err)
      });
  }
  
  const myCoord = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        useCoord(position.coords.latitude, position.coords.longitude);
        setQueryData(`${position.coords.latitude}+${position.coords.longitude}`);
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
      obj.unitName = data[i].variable.variableName;
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
    let west = long - .1;
    let south = lat - .1;
    let east = long + .1;
    let north = lat + .1;
    console.log(`west: ${west.toFixed(6)}, south: ${south.toFixed(6)}, east: ${east.toFixed(6)}, north: ${north.toFixed(6)}`);
    getWater(west.toFixed(6), south.toFixed(6), east.toFixed(6), north.toFixed(6));
  }

  useEffect(() => {setUserData(user)}, [user]);

  if (resetWaterDataFlag) {
    setWaterData([]);
    setResetWaterDataFlag(false);
    setQueryData(false);
  }
  if (isAuthenticated) {
    return (
      <Router>
          <Header resetWaterDataFlag={resetWaterDataFlag} setResetWaterDataFlag={setResetWaterDataFlag} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <div>

            <Switch>

              <Route path={`/query-result/${queryData}`}>
                    <DataRender openPortal={openPortal} setOpenPortal={setOpenPortal} waterData={waterData} userData={userData}/>
              </Route>


              
              <Route path="/profile" >
                  <UserProfile resetWaterDataFlag={resetWaterDataFlag} setResetWaterDataFlag={setResetWaterDataFlag}/>
              </Route>
              <Route exact path="/">
                
                {waterData.length > 1 ?
                <Redirect to={`/query-result/${queryData}`}/>
                : <InputForm getCoord={getCoord} myCoord={myCoord} setQueryData={setQueryData}/>}
                

              </Route>
            </Switch>
            <InputModal waterData={waterData} openPortal={openPortal} setOpenPortal={setOpenPortal} userData={userData}/>
          </div>
      </Router>
    )
  } else {
    return (
      <Router>
        <Route path="/login">
          <DeadHeader />
          <Landing  setLoggedIn={setLoggedIn}/>
        </Route>
      </Router>
 
    )
  }

}

export default App;


