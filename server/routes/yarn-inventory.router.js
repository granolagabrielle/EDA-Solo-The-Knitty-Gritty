const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get yarn inventory for specific user -- TO DO: ADD AUTHENTICATION
router.get('/', (req, res) => {
  const queryText = `SELECT "yarn_inventory"."id", "yarn_inventory"."yarn_title", "yarn_inventory"."skeins", "yarn_inventory"."skein_grams", "fibers"."fiber", "brands"."name", "weights"."weight", "yarn_inventory"."dye_lot", "yarn_inventory"."image", "yarn_inventory"."isdeleted"
  FROM "yarn_inventory" 
  JOIN "fibers"
  ON "fibers"."id"="yarn_inventory"."fiber"
  JOIN "brands"
  ON "brands"."id"="yarn_inventory"."brand"
  JOIN "weights"
  ON "weights"."id"="yarn_inventory"."weight"
  WHERE "yarn_inventory"."user_id"=$1 AND "yarn_inventory"."isdeleted"=FALSE
;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// router.get('/search', (req, res) => {
//   const searchTerm = req.query.search || '';
//   const queryText = `
//   SELECT * FROM yarn_inventory
//   WHERE (yarn_title ILIKE '%%');`;
//   const values = [`%${searchTerm}%`];
//   pool
//     .query(queryText, values)
//     .then((result) => res.send(result.rows))
//     .catch((error) => {
//       console.log(error);
//       res.sendStatus(500);
//     });
// });

// get yarn details for specific user -- pass in id of yarn that was clicked on
router.get('/:id', (req, res) => {
  const queryText = `
  SELECT "yarn_inventory"."id", "yarn_inventory"."yarn_title", "yarn_inventory"."skeins", "yarn_inventory"."skein_grams", "fibers"."fiber", "brands"."name", "weights"."weight", "yarn_inventory"."dye_lot", "yarn_inventory"."image", "yarn_inventory"."notes"
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

// post new yarn to inventory -- TO DO: ADD AUTHENTICATION
router.post('/', (req, res) => {
  console.log('in yarn post, check req.body', req.body);
  const queryText = `INSERT INTO "yarn_inventory" 
  ("brand", "yarn_title", "skeins", "fiber", "weight", "skein_grams", "dye_lot", "user_id", "notes", "image") 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
  pool
    .query(queryText, [
      req.body.brand,
      req.body.yarn_title,
      req.body.skeins,
      req.body.fiber,
      req.body.weight,
      req.body.skein_grams,
      req.body.dye_lot,
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

// delete yarn from inventory
router.delete('/:id', (req, res) => {
  const queryText = `
  UPDATE "yarn_inventory" 
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

// put to update yarn details
router.put('/:id', (req, res) => {
  console.log('in yarn put, check req.body', req.body);
  const queryText = `
    UPDATE "yarn_inventory"
    SET "skeins" = $1, "skein_grams" = $2, "notes" = $3
    WHERE "id"=$4 AND "user_id"=$5;`;
  const values = [req.body.skeins, req.body.skein_grams, req.body.notes, req.params.id, req.user.id];
  pool
    .query(queryText, values)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error updating yarn inventory', error);
      res.sendStatus(500);
    });
});

module.exports = router;
