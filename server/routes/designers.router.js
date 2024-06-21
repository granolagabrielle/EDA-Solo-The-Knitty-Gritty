const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get designer names for dropdown list
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "designer_names";`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// post new designer to list
router.post('/', (req, res) => {
  // console.log('in designer post, check req.body', req.body);
  const queryText = `INSERT INTO "designer_names" 
  ("name") 
  VALUES ($1);`;
  pool
    .query(queryText, [req.body.name])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
