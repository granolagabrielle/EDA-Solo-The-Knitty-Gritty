const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get designer names for dropdown list
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "fiber_content";`;
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
  console.log('in fiber content post, check req.body', req.body);
  const queryText = `INSERT INTO "fiber_content" 
  ("fiber_content") 
  VALUES ($1);`;
  pool
    .query(queryText, [req.body.fiber_content])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;