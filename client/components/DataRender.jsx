import React, { useEffect, useState } from 'react';

const DataRender = ({ waterData }) => {
  const [valueSelected, setValueSelected] = useState(false);
  const [waterSite, setWaterSite] = useState({});

  const renderWaterData = (value) => {
    console.log(waterData[value]);
    setWaterSite(waterData[value]);
    setValueSelected(true);
    
  }

  return (
    <div id="data-render-div">
      <div className="dataRender"> Your Activities </div>
      <div className ="dataRender"> You Should: </div>
      <div className="dataRender"> {!valueSelected ? <select onChange={(e) => renderWaterData(e.target.value)}>
        <option> Select A Site </option>
        {waterData.map((site, index) => (
          <option value={index}> {site.siteName} {site.variableName} </option>
        ))}
      </select> : <div> 
        <button type="button" onClick={() => setValueSelected(false)}> back </button>
        <div className="river-info"> Gauge Site: </div>
        <div className="river-info"> {waterSite.siteName} </div>
        <div className="river-info"> Measured: </div>
        <div className="river-info"> {waterSite.value} </div>
        <div className="river-info"> {waterSite.variableName} </div>
         </div>}</div>
    </div>
  )
}

export default DataRender;