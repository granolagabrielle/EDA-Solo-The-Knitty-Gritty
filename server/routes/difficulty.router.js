const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get difficulty levels for dropdown list
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "difficulty";`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// add new difficulty level
router.post('/', (req, res) => {
  console.log('in difficulty post, check req.body', req.body);
  const queryText = `INSERT INTO "difficulty" 
  ("level") 
  VALUES ($1);`;
  pool
    .query(queryText, [req.body.level])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
