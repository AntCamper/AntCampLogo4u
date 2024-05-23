const express = require('express');
const express = require('path');
const api = require("./Routes/index.js");
const exp = require('constants');
const PORT = process.env.PORT || 3001;
const app = express();

app.use("/api", api);
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true }));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));
app.listen(PORT, () => console.log('Server running at http://localhost:${PORT}`'))
