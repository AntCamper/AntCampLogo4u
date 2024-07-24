const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Helper functions
function readNotes() {
    try {
        const data = fs.readFileSync(path.join(__dirname, '..', '..', 'db', 'db.json'), 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        return [];
    }
}

function writeNotes(notes) {
    fs.writeFileSync(path.join(__dirname, '..', '..', 'db', 'db.json'), JSON.stringify(notes, null, 2));
}

router.get('/notes', function(req, res) {
    console.log('GET /api/notes route hit');
    const notes = readNotes();
    res.json(notes);
});

router.post('/notes', function(req, res) {
    const note = req.body;
    note.id = uuidv4();
    const notes = readNotes();
    notes.push(note);
    writeNotes(notes);
    res.status(201).json(note);
});

router.delete('/notes/:id', function(req, res) {
    const id = req.params.id;
    let notes = readNotes();
    notes = notes.filter(note => note.id !== id);
    writeNotes(notes);
    res.status(200).json({ message: 'Note deleted successfully' });
});

module.exports = router;