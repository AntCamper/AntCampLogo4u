const express = require('express');
const path = require('path');
const htmlRoutes = require('./routes/html_routes.js');
const apiRoutes = require('./routes/api_routes.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});