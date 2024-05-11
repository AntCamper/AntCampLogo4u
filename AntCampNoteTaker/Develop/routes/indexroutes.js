const express = require('express');
const path = require('path');
const notesRouter = require('Develop\routes\notes.js');

const router = express.Router();

router.use("/notes", notes);

module.exports = router;
