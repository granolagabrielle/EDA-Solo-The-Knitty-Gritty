const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get fiber contents for dropdown list
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "fibers";`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// add new fiber content
router.post('/', (req, res) => {
  // console.log('in fiber content post, check req.body', req.body);
  const queryText = `INSERT INTO "fibers" 
  ("fiber") 
  VALUES ($1);`;
  pool
    .query(queryText, [req.body.fiber])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
