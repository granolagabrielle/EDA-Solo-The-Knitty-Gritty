const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get pattern inventory for specific user
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "pattern_inventory"."id", "pattern_inventory"."title", "designer_names"."name", "pattern_types"."type", 
    "difficulty"."level", "weights"."weight", "pattern_inventory"."isDeleted", "pattern_inventory"."isFavorite"
    FROM "pattern_inventory"
    JOIN "designer_names"
    ON "designer_names"."id"="pattern_inventory"."designer_name"
    JOIN "pattern_types"
    ON "pattern_types"."id"="pattern_inventory"."pattern_type"
    JOIN "weights"
    ON "weights"."id"="pattern_inventory"."yarn_weight"
    JOIN "difficulty"
    ON "difficulty"."id"="pattern_inventory"."difficulty_level"
    WHERE "user_id"=$1 AND "pattern_inventory"."isDeleted"=FALSE;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// get favorite patterns for specific user
router.get('/favorites', (req, res) => {
  const queryText = `SELECT "pattern_inventory"."id", "pattern_inventory"."title", "designer_names"."name", "pattern_types"."type", 
    "difficulty"."level", "weights"."weight", "pattern_inventory"."isDeleted", "pattern_inventory"."isFavorite"
    FROM "pattern_inventory"
    JOIN "designer_names"
    ON "designer_names"."id"="pattern_inventory"."designer_name"
    JOIN "pattern_types"
    ON "pattern_types"."id"="pattern_inventory"."pattern_type"
    JOIN "weights"
    ON "weights"."id"="pattern_inventory"."yarn_weight"
    JOIN "difficulty"
    ON "difficulty"."id"="pattern_inventory"."difficulty_level"
  WHERE "pattern_inventory"."user_id"=$1 AND "pattern_inventory"."isFavorite"=TRUE;
;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// TODO -- why do I have adding/removing favorites for inventory and details pages???

// update pattern as favorite on details page
router.put('/favorite-pattern/:id', (req, res) => {
  const queryText = `
  UPDATE "pattern_inventory"
    SET "isFavorite" = TRUE
    WHERE "id"=$1 AND "user_id"=$2;`;
  pool
    .query(queryText, [req.params.id, req.user.id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error marking pattern as favorite', error);
      res.sendStatus(500);
    });
});

// remove pattern as favorite
router.put('/unfavorite-pattern/:id', (req, res) => {
  const queryText = `
  UPDATE "pattern_inventory"
    SET "isFavorite" = FALSE
    WHERE "id"=$1 AND "user_id"=$2;`;
  pool
    .query(queryText, [req.params.id, req.user.id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error removing pattern from favorites list', error);
      res.sendStatus(500);
    });
});

// update pattern as favorite in inventory
router.put('/inventory-fav', (req, res) => {
  const queryText = `
  UPDATE "pattern_inventory"
    SET "isFavorite" = TRUE
    WHERE "id"=$1 AND "user_id"=$2
    ;`;
  pool
    .query(queryText, [req.body.id, req.user.id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error marking as favorite', error);
      res.sendStatus(500);
    });
});

// remove pattern as favorite in inventory
router.put('/remove-inventory-fav', (req, res) => {
  const queryText = `
  UPDATE "pattern_inventory"
    SET "isFavorite" = FALSE
    WHERE "id"=$1 AND "user_id"=$2;`;
  pool
    .query(queryText, [req.body.id, req.user.id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error marking as favorite', error);
      res.sendStatus(500);
    });
});

// get pattern details for specific user -- pass in id of pattern that was clicked on
router.get('/:id', (req, res) => {
  const queryText = `
    SELECT "pattern_inventory"."id", "pattern_inventory"."title", "designer_names"."name", "pattern_types"."type", 
    "difficulty"."level", "weights"."weight", "pattern_inventory"."isFavorite"
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

// post new pattern to inventory
router.post('/', (req, res) => {
  const queryText = `INSERT INTO "pattern_inventory" 
    ("title", "designer_name", "pattern_type", "difficulty_level", "yarn_weight", "user_id") 
    VALUES ($1, $2, $3, $4, $5, $6);`;
  pool
    .query(queryText, [
      req.body.title,
      req.body.designer_name,
      req.body.pattern_type,
      req.body.difficulty_level,
      req.body.yarn_weight,
      req.user.id,
      // req.body.notes,
      // JSON.stringify(req.body.image),
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
// router.put('/:id', (req, res) => {
// console.log('in pattern put, check req.body', req.body);
//   const queryText = `
//       UPDATE "pattern_inventory"
//       SET "notes" = $1
//       WHERE "id"=$2 AND "user_id"=$3;`;
//   const values = [req.body.notes, req.params.id, req.user.id];
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

// delete pattern from inventory
router.delete('/:id', (req, res) => {
  const queryText = `
    UPDATE "pattern_inventory" 
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
