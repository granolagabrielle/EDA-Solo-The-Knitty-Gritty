const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get project inventory for specific user -- TO DO: ADD AUTHENTICATION
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "project_tracking" WHERE "user_id"=$1;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
// WORKS IN POSTMAN

// get project details for specific pattern of user -- pass in id of pattern that was clicked on
router.get('/:id', (req, res) => {
  const queryText = `
      SELECT * FROM "project_tracking" WHERE "project_id"=$1 AND "user_id"=$2;
      `;
  pool
    .query(queryText, [req.params.id, req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error in GET /api/projects/:id', err);
      res.sendStatus(500);
    });
});
// WORKS IN POSTMAN

// post new project for user
router.post('/', (req, res) => {
  console.log('in project post, check req.body', req.body);
  const queryText = `INSERT INTO "project_tracking" 
      ("pattern_id", "date_started", "notes", "progress", "yarn_id", "user_id", "project_image") 
      VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  pool
    .query(queryText, [
      req.body.pattern_id,
      req.body.date_started,
      req.body.notes,
      req.body.progress,
      req.body.yarn_id,
      req.user.id,
      req.body.project_image,
    ])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
// WORKS IN POSTMAN

// put to update project details
router.put('/:id', (req, res) => {
  console.log('in project put, check req.body', req.body);
  const queryText = `
    UPDATE "project_tracking"
    SET "pattern_id" = $1, "date_started" = $2, "notes" = $3, "progress" = $4, "yarn_id" = $5, "project_image" = $6
    WHERE "project_id"=$7 AND "user_id"=$8;`;
  const values = [
    req.body.pattern_id,
    req.body.date_started,
    req.body.notes,
    req.body.progress,
    req.body.yarn_id,
    req.body.project_image,
    req.params.id,
    req.user.id,
  ];
  pool
    .query(queryText, values)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error updating project', error);
      res.sendStatus(500);
    });
});

// delete project from inventory
router.delete('/:id', (req, res) => {
  const queryText = `
      DELETE FROM "project_tracking" 
      WHERE "project_id"=$1 
      AND "user_id"=$2;
      `;
  pool
    .query(queryText, [req.params.id, req.user.id]) // $1, $2
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error deleting item', error);
      res.sendStatus(500);
    });
});
// WORKS IN POSTMAN

module.exports = router;
