const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => { 
    console.log('Accessing the home page'); //attempt to debug 
    res.sendFile(path.join(__dirname, 'Develop\public\index.html'));
});

router.get('/notes', (req, res) => { 
    console.log('Accessing the notes page'); //attempt to debug
    res.sendFile(path.join(__dirname, 'Develop\public\notes.html'));
});

module.exports = router;
