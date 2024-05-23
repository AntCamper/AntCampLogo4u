// Import required modules
const express = require("express");
const fs = require("fs");
const util = require("util");
const crypto = require("crypto");

// Create a router instance
const notes = express.Router();

// Convert fs methods to promises
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Destination file path
const destination = "./db/db.json";

// GET Route retrieving the notes
notes.get("/", async (req, res) => {
  try {
    const data = await readFile(destination);
    res.json(JSON.parse(data));
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while reading the notes.");
  }
});

// POST Route for adding a new note
notes.post("/", async (req, res) => {
  try {
    const { title, text } = req.body;
    if (!title ||!text) {
      return res.status(400).send("Title and Text are required.");
    }

    const newNote = {
      id: crypto.randomUUID(),
      title,
      text
    };

    const data = await readFile(destination);
    const notes = JSON.parse(data);
    notes.push(newNote);

    await writeFile(destination, JSON.stringify(notes));
    res.status(201).json(newNote); // Send the newly created note
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding the note.");
  }
});

// DELETE Route for deleting a note by ID
notes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readFile(destination);
    const notes = JSON.parse(data);
    const index = notes.findIndex(note => note.id === id);

    if (index === -1) {
      return res.status(404).send("Note not found.");
    }

    notes.splice(index, 1);
    await writeFile(destination, JSON.stringify(notes));
    res.sendStatus(204); // No content to return
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting the note.");
  }
});

// Export the router
module.exports = notes;
// added more to my commit msg