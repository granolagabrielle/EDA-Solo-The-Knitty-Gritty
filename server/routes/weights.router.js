const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get designer names for dropdown list
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "yarn_weight";`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// add new yarn weight
router.post('/', (req, res) => {
  console.log('in yarn weight post, check req.body', req.body);
  const queryText = `INSERT INTO "yarn_weight" 
  ("weight") 
  VALUES ($1);`;
  pool
    .query(queryText, [req.body.weight])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
