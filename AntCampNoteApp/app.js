const express = require("express");
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const apiRoutes = require('./routes/apiRoutes/notes');
const htmlRoutes = require('./routes/htmlRoutes/index');

app.get('/api/notes', function(req, res) {
    const notes = readNotes();
    res.json(notes);
});

app.post('/api/notes', function(req, res) {
    const note = req.body;
    note.id = uuidv4();
    const notes = readNotes();
    notes.push(note);
    writeNotes(notes);
    res.status(201).json(note);
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname + '/notes.html'));
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/api', apiRoutes);
app.use(htmlRoutes);
app.use(express.static('public'));

function readNotes() {
    try {
        const data = fs.readFileSync('./db.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        return[];
    }
}

function writeNotes(notes) {
    fs.writeFileSync('./db.json', JSON.stringify(notes, null, 2));
}

app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});
