const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get yarn inventory for specific user
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "yarn_inventory"."id", "yarn_inventory"."title", "yarn_inventory"."total_grams", "fibers"."fiber", "brands"."name", "weights"."weight", "yarn_inventory"."dye_lot", "yarn_inventory"."isDeleted", "yarn_inventory"."isFavorite", "yarn_inventory"."location"
  FROM "yarn_inventory" 
  JOIN "fibers"
  ON "fibers"."id"="yarn_inventory"."fiber"
  JOIN "brands"
  ON "brands"."id"="yarn_inventory"."brand"
  JOIN "weights"
  ON "weights"."id"="yarn_inventory"."weight"
  WHERE "yarn_inventory"."user_id"=$1 AND "yarn_inventory"."isDeleted"=FALSE
  ORDER BY "id" ASC
;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// get favorite yarns for specific user
router.get('/favorites', (req, res) => {
  const queryText = `SELECT "yarn_inventory"."id", "yarn_inventory"."title", "yarn_inventory"."total_grams", "fibers"."fiber", "brands"."name", "weights"."weight", "yarn_inventory"."dye_lot", "yarn_inventory"."isDeleted", "yarn_inventory"."isFavorite", "yarn_inventory"."location"
  FROM "yarn_inventory" 
  JOIN "fibers"
  ON "fibers"."id"="yarn_inventory"."fiber"
  JOIN "brands"
  ON "brands"."id"="yarn_inventory"."brand"
  JOIN "weights"
  ON "weights"."id"="yarn_inventory"."weight"
  WHERE "yarn_inventory"."user_id"=$1 AND "yarn_inventory"."isFavorite"=TRUE
  ORDER BY "id" ASC;
;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
      console.log('check fav router', result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// update yarn as favorite on details page
router.put('/favorite-yarn/:id', (req, res) => {
  const queryText = `
  UPDATE "yarn_inventory"
    SET "isFavorite" = TRUE
    WHERE "id"=$1 AND "user_id"=$2;`;
  pool
    .query(queryText, [req.params.id, req.user.id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error marking as favorite', error);
      res.sendStatus(500);
    });
});

// remove yarn as favorite
router.put('/unfavorite-yarn/:id', (req, res) => {
  const queryText = `
  UPDATE "yarn_inventory"
    SET "isFavorite" = FALSE
    WHERE "id"=$1 AND "user_id"=$2;`;
  pool
    .query(queryText, [req.params.id, req.user.id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error removing yarn from favorites list', error);
      res.sendStatus(500);
    });
});

// update yarn as favorite in inventory
router.put('/inventory-fav', (req, res) => {
  console.log('in inventory favorite put, check req.body.id', req.body.id);
  const queryText = `
  UPDATE "yarn_inventory"
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

// remove yarn as favorite in inventory
router.put('/remove-inventory-fav', (req, res) => {
  console.log('in inventory favorite put, check req.body.id', req.body.id);
  const queryText = `
  UPDATE "yarn_inventory"
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

// get yarn details for specific user -- pass in id of yarn that was clicked on
router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log('in yarn deets GET, check req.params.id', req.params.id);
  console.log('in yarn deets GET, check req.user.id', req.user.id);
  const queryText = `
 SELECT "yarn_inventory"."id", "yarn_inventory"."title", "yarn_inventory"."total_grams", "fibers"."fiber", "brands"."name", "weights"."weight", "yarn_inventory"."dye_lot", "yarn_inventory"."isFavorite", "yarn_inventory"."location"
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

// get yarn inventory with search params
// router.get('/search', (req, res) => {
//   const searchQuery = `%${req.query.search}%`;
//   const queryText = `
//   SELECT "yarn_inventory".*, "brands"."name", "fibers"."fiber", "weights"."weight"
// FROM "yarn_inventory"
// JOIN "fibers"
//  ON "fibers"."id"="yarn_inventory"."fiber"
//  JOIN "brands"
//  ON "brands"."id"="yarn_inventory"."brand"
//  JOIN "weights"
//  ON "weights"."id"="yarn_inventory"."weight"
//  WHERE ("yarn_inventory"."yarn_title" ILIKE $1
//  OR "brands"."name" ILIKE $1
//  OR "fibers"."fiber" ILIKE $1
//  OR "weights"."weight" ILIKE $1)
//  AND "yarn_inventory"."user_id"=$2
// ;`;
//   pool
//     .query(queryText, [searchQuery, req.user.id])
//     .then((result) => {
//       res.send(result.rows);
//     })
//     .catch((error) => {
//       console.log('error searching yarn inventory', error);
//       res.sendStatus(500);
//     });
// });

// post new yarn to inventory
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('in yarn post, check req.body', req.body);
  const queryText = `INSERT INTO "yarn_inventory" 
  ("brand", "title", "fiber", "weight", "skeins", "skein_grams", "total_grams", "dye_lot", "user_id", "location") 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
  pool
    .query(queryText, [
      req.body.brand,
      req.body.title,
      req.body.fiber,
      req.body.weight,
      req.body.skeins,
      req.body.skein_grams,
      req.body.total_grams,
      req.body.dye_lot,
      req.user.id,
      req.body.location,
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
  console.log('in yarn inventory delete router, check req.body.id', req.params.id);
  const queryText = `
  UPDATE "yarn_inventory" 
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

// put to update yarn details
router.put('/:id', (req, res) => {
  // console.log('in yarn put, check req.body', req.body);
  const queryText = `
    UPDATE "yarn_inventory"
    SET "total_grams" = $1
    WHERE "id"=$2 AND "user_id"=$3;`;
  const values = [req.body.total_grams, req.params.id, req.user.id];
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
