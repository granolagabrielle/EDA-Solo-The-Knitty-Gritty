const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get yarn inventory for specific user -- TO DO: ADD AUTHENTICATION
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "yarn_inventory" WHERE "user_id"=$1;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
// WORKS IN POSTMAN

// get yarn details for specific user -- pass in id of yarn that was clicked on
router.get('/:id', (req, res) => {
  const queryText = `
  SELECT "yarn_inventory"."id", "yarn_inventory"."skeins", "yarn_inventory"."skein_grams", "fibers"."fiber", "brands"."name", "weights"."weight", "yarn_inventory"."dye_lot", "yarn_inventory"."yarn_image"
  FROM "yarn_inventory" 
  JOIN "fibers"
  ON "fibers"."id"="yarn_inventory"."fiber"
  JOIN "brands"
  ON "brands"."id"="yarn_inventory"."brand"
  JOIN "weights"
  ON "weights"."id"="yarn_inventory"."weight"
  WHERE "yarn_inventory"."id"=$1 AND "yarn_inventory"."user_id"=$2
;
  `;
  pool
    .query(queryText, [req.params.id, req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error in GET /api/yarn/:id', err);
      res.sendStatus(500);
    });
});
// WORKS IN POSTMAN

// post new yarn to inventory -- TO DO: ADD AUTHENTICATION
router.post('/', (req, res) => {
  console.log('in yarn post, check req.body', req.body);
  const queryText = `INSERT INTO "yarn_inventory" 
  ("brand", "skeins", "fiber_content", "weight", "grams_in_skein", "dye_lot", "user_id", "yarn_image") 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
  pool
    .query(queryText, [
      req.body.brand,
      req.body.skeins,
      req.body.fiber_content,
      req.body.weight,
      req.body.grams_in_skein,
      req.body.dye_lot,
      req.user.id,
      req.body.yarn_image,
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

// delete yarn from inventory
router.delete('/:id', (req, res) => {
  const queryText = `
  DELETE FROM "yarn_inventory" 
  WHERE "yarn_id"=$1 
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

// put to update yarn details
router.put('/:id', (req, res) => {
  console.log('in yarn put, check req.body', req.body);
  const queryText = `
    UPDATE "yarn_inventory"
    SET "brand" = $1, "skeins" = $2, "fiber_content" = $3, "weight" = $4, "grams_in_skein" = $5, "dye_lot" = $6, "yarn_image" = $7
    WHERE "yarn_id"=$8 AND "user_id"=$9;`;
  const values = [
    req.body.brand,
    req.body.skeins,
    req.body.fiber_content,
    req.body.weight,
    req.body.grams_in_skein,
    req.body.dye_lot,
    req.body.yarn_image,
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
// WORKS IN POSTMAN

module.exports = router;
