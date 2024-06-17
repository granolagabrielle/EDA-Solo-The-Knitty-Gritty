const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get designer names for dropdown list
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "brands";`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// add new yarn brand
router.post('/', (req, res) => {
  console.log('in yarn brand post, check req.body', req.body);
  const queryText = `INSERT INTO "brands" 
  ("name") 
  VALUES ($1);`;
  pool
    .query(queryText, [req.body.brand_name])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;