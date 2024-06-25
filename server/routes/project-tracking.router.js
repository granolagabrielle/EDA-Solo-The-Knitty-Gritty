const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get project inventory for specific user
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "project_tracking"."id", "pattern_inventory"."pattern_title", "project_tracking"."date_started", "brands"."name", "yarn_inventory"."yarn_title",
     "project_tracking"."image", "project_tracking"."isdeleted"
  FROM "project_tracking"
  JOIN "pattern_inventory"
  ON "pattern_inventory"."id"="project_tracking"."pattern_id"
  JOIN "yarn_inventory"
  ON "yarn_inventory"."id"="project_tracking"."yarn_id"
  JOIN "brands"
  ON "brands"."id"="yarn_inventory"."brand"
  WHERE "project_tracking"."user_id"=$1 AND "project_tracking"."isdeleted"=FALSE;`;
  // "project_tracking"."progress",
  pool
    .query(queryText, [req.user.id])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// get project details for specific pattern of user -- pass in id of pattern that was clicked on
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `
      SELECT "project_tracking"."id", "pattern_inventory"."pattern_title", "project_tracking"."date_started", "brands"."name", "yarn_inventory"."yarn_title", 
     "project_tracking"."image"
  FROM "project_tracking"
  JOIN "pattern_inventory"
  ON "pattern_inventory"."id"="project_tracking"."pattern_id"
  JOIN "yarn_inventory"
  ON "yarn_inventory"."id"="project_tracking"."yarn_id"
  JOIN "brands"
  ON "brands"."id"="yarn_inventory"."brand"
  WHERE "project_tracking"."id"=$1 AND "project_tracking"."user_id"=$2;
  `;
  // JOIN "project_notes"
  // ON "project_notes"."id"="project_tracking"."notes"
  // , "project_notes"."notes"
  // "project_tracking"."progress",
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

// post new project for user
router.post('/', (req, res) => {
  console.log('in project post, check req.body', req.body);
  const queryText = `INSERT INTO "project_tracking" 
      ("pattern_id", "date_started", "yarn_id", "user_id", "image") 
      VALUES ($1, $2, $3, $4, $5);`;
  pool
    .query(queryText, [
      req.body.pattern_id,
      req.body.date_started,
      // req.body.notes,
      // req.body.progress,
      req.body.yarn_id,
      req.user.id,
      req.body.image,
    ])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// // put to update project details
// router.put('/:id', (req, res) => {
//   // console.log('in project put, check req.body', req.body);
//   const queryText = `
//     UPDATE "project_tracking"
//     SET "notes" = $1, "progress" = $2
//     WHERE "project_id"=$3 AND "user_id"=$4;`;
//   const values = [req.body.notes, req.body.progress, req.params.id, req.user.id];
//   pool
//     .query(queryText, values)
//     .then((result) => {
//       res.sendStatus(201);
//     })
//     .catch((error) => {
//       console.log('error updating project', error);
//       res.sendStatus(500);
//     });
// });

// delete project from inventory
router.delete('/:id', (req, res) => {
  const queryText = `
    UPDATE "project_tracking" 
    SET "isdeleted"=TRUE
    WHERE "id"=$1 
    AND "user_id"=$2;
      `;
  pool
    .query(queryText, [req.params.id, req.user.id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error deleting item', error);
      res.sendStatus(500);
    });
});

module.exports = router;
