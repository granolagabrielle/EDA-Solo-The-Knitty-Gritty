const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get project inventory for specific user
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "project_tracking"."id", "pattern_inventory"."title", "project_tracking"."date_started", "brands"."name", "yarn_inventory"."yarn_title",
      "project_tracking"."isDeleted", "project_tracking"."grams_knit", "project_tracking"."est_grams_needed", "project_tracking"."needle_size", "project_tracking"."yarn_id"
  FROM "project_tracking"
  JOIN "pattern_inventory"
  ON "pattern_inventory"."id"="project_tracking"."pattern_id"
  JOIN "yarn_inventory"
  ON "yarn_inventory"."id"="project_tracking"."yarn_id"
  JOIN "brands"
  ON "brands"."id"="yarn_inventory"."brand"
  WHERE "project_tracking"."user_id"=$1 AND "project_tracking"."isDeleted"=FALSE;`;
  // "project_tracking"."progress",
  pool
    .query(queryText, [req.user.id])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// get project details for specific project of user -- pass in id of project that was clicked on
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `
       SELECT "project_tracking"."id", "pattern_inventory"."title", "project_tracking"."date_started", "brands"."name", "yarn_inventory"."yarn_title", 
      "project_tracking"."grams_knit", "project_tracking"."est_grams_needed", "project_tracking"."needle_size", "project_tracking"."yarn_id"
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
  const queryText = `INSERT INTO "project_tracking" 
      ("pattern_id", "date_started", "est_grams_needed", "grams_knit", "yarn_id", "user_id", "needle_size") 
      VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  pool
    .query(queryText, [
      req.body.pattern_id,
      req.body.date_started,
      req.body.est_grams_needed,
      req.body.grams_knit,
      req.body.yarn_id,
      req.user.id,
      req.body.needle_size,
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
router.put('/:id', (req, res) => {
  const queryText = `
    UPDATE "project_tracking"
    SET "grams_knit"=$1
    WHERE "id"=$2 AND "user_id"=$3;`;
  const values = [req.body.grams_knit, req.params.id, req.user.id];
  const yarnId = req.body.yarn_id;
  // const gramsKnit = req.body.grams_knit;
  const gramsUsed = req.body.grams_used;
  pool
    .query(queryText, values)
    .then((result) => {
      const updateYarnQuery = `
      UPDATE "yarn_inventory"
      SET "total_grams"="total_grams"-$1
      WHERE "id"=$2 AND "user_id"=$3;`;
      pool
        .query(updateYarnQuery, [gramsUsed, yarnId, req.user.id])
        .then((result) => {
          res.sendStatus(201);
        })
        .catch((error) => {
          console.log('error updating yarn inventory', error);
        });
    })
    .catch((error) => {
      console.log('error updating project', error);
      res.sendStatus(500);
    });
});

// "yarn_id"=$2 AND
// req.body.yarn_id,

// delete project from inventory
router.delete('/:id', (req, res) => {
  const queryText = `
    UPDATE "project_tracking" 
    SET "isDeleted"=TRUE
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
