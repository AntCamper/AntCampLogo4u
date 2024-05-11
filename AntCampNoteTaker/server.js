const espress = require("express");
const path = require("path");
const api = require("./routes/index.js");
const PORT = process.env.PORT || 3001;
const app = express();

app.get("/", (req, res) => 
    res.sendFile(path.join(__dirname, "Develop\public\index.html")));
app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "Develop\public\notes.html")));

app.listen(PORT, () =>
    console.log(`Listening to https://localhost:${PORT}`))