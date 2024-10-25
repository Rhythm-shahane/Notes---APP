const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Get all notes
router.get('/', async (req, res) => {
    const notes = await Note.find();
    res.render('index', { notes });
});

// Create a new note
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    await note.save();
    res.redirect('/notes');
});

// Route to serve the edit form for a note
router.get('/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).send('Note not found');
    }
    res.render('edit', { note });
});

// Route to handle updates to a note
router.post('/update/:id', async (req, res) => {
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(req.params.id, { title, content });
    if (!note) {
        return res.status(404).send('Note not found');
    }
    res.redirect('/notes');
});

// Route to handle deleting a note
router.post('/delete/:id', async (req, res) => {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
        return res.status(404).send('Note not found');
    }
    res.redirect('/notes');
});

module.exports = router;
