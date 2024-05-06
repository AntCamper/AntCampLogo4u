const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => { // Fixed typo: req. -> req,
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/notes', (req, res) => { // Fixed typo: 'notes' -> '/notes'
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

module.exports = router;
