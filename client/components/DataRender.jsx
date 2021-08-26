import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DataRender = ({ waterData, setOpenPortal }) => {
  const [valueSelected, setValueSelected] = useState(false);
  const [waterSite, setWaterSite] = useState(null);
  const [similarSites, setSimilarSites] = useState([])
  const [selectUnitName, setSelectUnitName] = useState('');
  const [successCompare, setSuccessCompare] = useState({})
  const [selectVal, setSelectVal] = useState(0);

  const renderWaterData = (value) => {
    // console.log(waterData[value]);
    setWaterSite(waterData[value]);
    setValueSelected(true);
    setSelectUnitName(waterData[value].unitName);
    setSelectVal(waterData[value].value);
    // console.log(similarSites)
    // compareRecord(similarSites, waterData[value].unitName, waterData[value].value);
    
  }

  const compareRecord = (recArray, unitType, siteVal) => {
    // console.log('unittype:', unitType);
    if (unitType === 'Gage height, ft') {
      for (let i = 0; i < recArray.length; i++) {
        // console.log('query unitname', recArray[i].unitname)
        if (recArray[i].unitname === 'ft') {
          // console.log('value:', recArray[i].flow_height, 'siteval;', siteVal);
          if (recArray[i].flow_height <= (siteVal + 2) && recArray[i].flow_height >= (siteVal - 2)) {
            setSuccessCompare(recArray[i]);
            // console.log(successCompare);
          }
        }
      }
    } else {
      for (let i = 0; i < recArray.length; i++) {
        if (recArray[i].unitname === 'ft/s') {
          if (recArray[i].flow_height <= (siteVal + 250) && recArray[i].flow_height >= (siteVal - 250)) {
            setSuccessCompare(recArray[i]);
            // console.log(successCompare);
          }
        }
      }
    }
  }
  

  const backButton = () => {
    setWaterSite(null);
    setValueSelected(false);
    setSelectUnitName('');
  }

  const getRecordData = (site) => {
    console.log('site log:', site);
    axios.get(`/api/getRecord/${site}`)
      .then((result) => {
        setSimilarSites(result.data);
        console.log(result.data);
        compareRecord(result.data, selectUnitName, selectVal);
      })
      .catch((err) => {
        console.log('error in getrecordData request', err);
      })
  }

  useEffect(() => {waterSite ? getRecordData(waterSite.siteName) : null }, [waterSite])
  // useEffect(() => compareRecord(similarSites, selectUnitName, selectVal), similarSites)

  return (
    <div id="data-render-div">
      <div className="dataRender"> 
        <h3>Activity Records</h3>
        {similarSites.length >= 1 ? similarSites.map((site, index) => (
          <div className=" activity-record" key={index}>
            <div> {site.sitename}</div>
            <div> {site.flow_height} {site.unitname} </div>
            <div> Activity: {site.activity}</div>
          </div>
        )) : <div> You Should Add More Records</div> }
        <button type="button" onClick={() => setOpenPortal(true)}>Add Record</button>
      </div>
      <div className ="dataRender">
        <h3>Activity Log</h3>
        <div className="activity-log">
          <h3> You Should: </h3>
          {Object.keys(successCompare).length > 0 ? <div><h4>Go</h4>
          <div> {successCompare.activity}</div>
          <h4>near</h4>
          <div>{successCompare.sitename}</div></div> : <div> Find Another River </div>}
        </div>
      </div>
      <div className="dataRender"> 
        <h3>Current River Info</h3>
        {!valueSelected ? <select onChange={(e) => renderWaterData(e.target.value)}>
          <option> Select A Site </option>
          {waterData.map((site, index) => (
            <option key={index + site.siteCode} value={index}> {site.siteName} {site.variableName} </option>
          ))}
        </select> : <div> 
          <button type="button" onClick={() => backButton()}> back </button>
          <div className="river-info">
            <div> Gauge Site: </div>
            <div> {waterSite.siteName} </div>
            <div> Measured: </div>
            <div> {waterSite.value} </div>
            <div> {waterSite.unitName} </div>
          </div>
         </div>}</div>
    </div>
  )
}

export default DataRender;