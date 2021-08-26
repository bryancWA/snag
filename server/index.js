const axios = require('axios');
const express = require('express');
const morgan = require('morgan');
const { GEOCODE_KEY } = require('../config.js')
const { insertUserInfo, getRecordQuery } = require('./queries.js')
const app = express();

const PORT = 3000;

app.use(morgan('dev'));

app.use(express.static('public'));
app.use(express.json());

app.get('/api/getcoordinates/:zipCode', (req, res) => {
  const { zipCode } = req.params;
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${GEOCODE_KEY}`)
  .then((result) => {
    // console.log(result);
    res.send(result.data);
  })
  .catch((err) => {
    console.log('err in geocode get request', err);
    res.sendStatus(500);
  });
})

app.get('/api/getwater/:west/:south/:east/:north', (req, res) => {
  const { west, south, east, north } = req.params;
  // console.log('req.params:', west, south, east, north);
  axios.get(`http://waterservices.usgs.gov/nwis/iv/?format=json&bBox=${west},${south},${east},${north}&parameterCd=00060,00065,00010&siteStatus=active`)
  .then((result) => {
    // console.log('getwater result:', result.data);
    res.send(result.data);

  })
  .catch((err) => {
    console.log('error in USGS get req', err);
    res.sendStatus(500);
  });
})

app.post('/api/userinput', (req, res) => {
  console.log(req.body);
  const { username, sitename, value, unitname, activity } = req.body;
  insertUserInfo(username, sitename, value, unitname, activity, res);
})

app.get('/api/getRecord/:site', (req, res) => {
  const { site } = req.params;
  getRecordQuery(site, res);
})

app.listen(PORT, () => {
  console.log(`server listening on port:${PORT}`)
})