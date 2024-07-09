const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

router.get('/', function(req, res) {
    const notes = readNotes();
    res.json(notes);
});

router.post('/', function(req, res) {
    const note = req.body;
    note.id = uuidv4();
    const notes = readNotes();
    notes.push(note);
    writeNotes(notes);
    res.status(201).json(note);
});

module.exports = router;