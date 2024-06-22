const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get notes for project
router.get('/:projectId', (req, res) => {
  const projectId = req.params.projectId;
  const queryText = `
    SELECT * FROM "project_notes"
    WHERE "project_notes"."project_id"=$1;`;
  pool
    .query(queryText, [projectId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error getting notes', error);
      res.sendStatus(500);
    });
});

// post new note to project
router.post('/:projectId', (req, res) => {
  const note = req.body;
  const userId = req.user.id;
  const projectId = req.params.projectId;
  const queryText = `
    INSERT INTO "project_notes"
    ("notes", "project_id", "date", "user_id")
    VALUES ($1, $2, $3, $4);`;
  pool
    .query(queryText, [note.notes, projectId, note.date, userId])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log('error posting new note', error);
      res.sendStatus(500);
    });
});

// delete notes for project
router.delete('/:noteId', (req, res) => {
  const noteId = req.params.noteId;
  const queryText = `
  DELETE FROM "project_notes"
WHERE "id"=$1;`;
  pool
    .query(queryText, [noteId])
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log('error deleting note', error);
      res.sendStatus(500);
    });
});

module.exports = router;
