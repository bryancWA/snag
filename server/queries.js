const { pool } = require('../config.js');

const insertUserInfo = (usrnme, stenm, val, untnm, actvty, res) => {
  query = {
    text: `INSERT INTO userinput (username, sitename, flow_height, unitname, activity) VALUES ($1, $2, $3, $4, $5)`,
    values: [usrnme, stenm, val, untnm, actvty],
  }
  pool.query(query.text, query.values)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('insert error', err);
      res.sendStatus(500);
    })
}

module.exports = {
  insertUserInfo
}