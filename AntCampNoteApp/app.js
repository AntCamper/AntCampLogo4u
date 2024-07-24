const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Helper functions
function readNotes() {
    const data = fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf8');
    return JSON.parse(data).notes;
}

function writeNotes(notes) {
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notes }, null, 2)
    );
}

app.use(cors());

// API Routes
app.get('/api/notes', (req, res) => {
    const notes = readNotes();
    res.json(notes);
});


app.post('/api/notes', (req, res) => {
    const notes = readNotes();
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    };
    notes.push(newNote);
    writeNotes(notes);
    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    let notes = readNotes();
    notes = notes.filter(note => note.id !== req.params.id);
    writeNotes(notes);
    res.json({ message: 'Note deleted' });
});

// HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});