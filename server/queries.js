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

const getRecordQuery = (user = 'bryan', siteName, res) => {
  query = {
    text: `SELECT * FROM userinput WHERE username = '${user}' AND sitename = $1`,
    values: [siteName],
  }
  pool.query(query.text, query.values)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      console.log('err in getRecordQuery', err);
      res.sendStatus(500);
    })
}

const getAllRecordsByName = (name, res) => {
  query = {
    text: `SELECT * FROM userinput WHERE username = $1`,
    values: [name]
  }
  pool.query(query.text, query.values)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      console.log('err in getAllRecordByName', err);
      res.sendStatus(500);
    })
}

module.exports = {
  insertUserInfo,
  getRecordQuery,
  getAllRecordsByName
}