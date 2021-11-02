import React, { useEffect, useState } from 'react';
import Header from './Header.jsx';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = ({ resetWaterDataFlag, setResetWaterDataFlag }) => {
  const [userData, SetUserData] = useState({ 'given_name': 'Bob', 'family_name': 'Dole', 'picture': '', 'email': 'dole@email.com', 'email_verified': true });
  const [userRecords, SetUserRecords] = useState(['no records']);

  const { user, isAuthenticated, isLoading } = useAuth0();

  const getUserData = (user) => {
    if (user) {
      SetUserData(user);
      getAllUserRecords(user.given_name);
    }
  }

  const getAllUserRecords = (name) => {
    axios.get(`/api/records/${name}`)
      .then((response) => {
        console.log(response);
        if (response.data.length) {
          SetUserRecords(response.data);
        }
      })
      .catch((err) => console.log('error in getalluserrecords', err));

  }
  
  //get request to display all activity records matching user name

  useEffect(() => { isAuthenticated ? getUserData(user) : null }, []);
 
  return (
    <div>
      <h2>{`Welcome ${userData.given_name}`}</h2>
      <img src={`${userData.picture}`}/>
      <h3>Your Records</h3>
      {userRecords.map((record) => (
        <div key={record.id + record.activity}>{`Go ${record.activity} at ${record.sitename}`}</div>
      ))}
    </div>
 )  
}

export default UserProfile;
