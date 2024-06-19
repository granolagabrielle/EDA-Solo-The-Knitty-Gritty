const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get pattern inventory for specific user -- TO DO: ADD AUTHENTICATION
router.get('/', (req, res) => {
  const queryText = `SELECT "pattern_inventory"."id", "pattern_inventory"."pattern_title", "designer_names"."name", "pattern_types"."type", 
    "difficulty"."level", "weights"."weight", "pattern_inventory"."notes", "pattern_inventory"."image", "pattern_inventory"."isdeleted"
    FROM "pattern_inventory"
    JOIN "designer_names"
    ON "designer_names"."id"="pattern_inventory"."designer_name"
    JOIN "pattern_types"
    ON "pattern_types"."id"="pattern_inventory"."pattern_type"
    JOIN "weights"
    ON "weights"."id"="pattern_inventory"."yarn_weight"
    JOIN "difficulty"
    ON "difficulty"."id"="pattern_inventory"."difficulty_level"
    WHERE "user_id"=$1 AND "pattern_inventory"."isdeleted"=FALSE;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// get pattern details for specific user -- pass in id of pattern that was clicked on
router.get('/:id', (req, res) => {
  const queryText = `
    SELECT "pattern_inventory"."id", "pattern_inventory"."pattern_title", "designer_names"."name", "pattern_types"."type", 
    "difficulty"."level", "weights"."weight", "pattern_inventory"."notes", "pattern_inventory"."image"
    FROM "pattern_inventory"
    JOIN "designer_names"
    ON "designer_names"."id"="pattern_inventory"."designer_name"
    JOIN "pattern_types"
    ON "pattern_types"."id"="pattern_inventory"."pattern_type"
    JOIN "weights"
    ON "weights"."id"="pattern_inventory"."yarn_weight"
    JOIN "difficulty"
    ON "difficulty"."id"="pattern_inventory"."difficulty_level"
    WHERE "pattern_inventory"."id"=$1 AND "user_id"=$2;
    `;
  pool
    .query(queryText, [req.params.id, req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error in GET /api/patterns/:id', err);
      res.sendStatus(500);
    });
});

// post new pattern to inventory -- TO DO: ADD AUTHENTICATION
router.post('/', (req, res) => {
  console.log('in pattern post, check req.body', req.body);
  const queryText = `INSERT INTO "pattern_inventory" 
    ("pattern_title", "designer_name", "pattern_type", "difficulty_level", "yarn_weight", "user_id", "notes", "image") 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
  pool
    .query(queryText, [
      req.body.pattern_title,
      req.body.designer_name,
      req.body.pattern_type,
      req.body.difficulty_level,
      req.body.yarn_weight,
      req.user.id,
      req.body.notes,
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

// put to update pattern details
router.put('/:id', (req, res) => {
  console.log('in pattern put, check req.body', req.body);
  const queryText = `
      UPDATE "pattern_inventory"
      SET "pattern_title" = $1, "designer_name" = $2, "pattern_type" = $3, "difficulty_level" = $4, "yarn_weight" = $5, "notes" = $6, "image" = $7
      WHERE "id"=$8 AND "user_id"=$9;`;
  const values = [
    req.body.title,
    req.body.designer_name,
    req.body.pattern_type,
    req.body.difficulty_level,
    req.body.yarn_weight,
    req.body.image,
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

// delete pattern from inventory
router.delete('/:id', (req, res) => {
  const queryText = `
    UPDATE "pattern_inventory" 
    SET "isdeleted"=TRUE
    WHERE "id"=$1 
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

module.exports = router;
