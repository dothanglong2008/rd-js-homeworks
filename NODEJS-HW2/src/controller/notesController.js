const express = require('express');
const router = express.Router();

const noteServices = require('../services/noteServices');
const { checkToken } = require('../services/utils');

router.get('/api/notes', checkToken, noteServices.getNotesByUser);

router.post('/api/notes', checkToken, noteServices.createNewNote);

router.get('/api/notes/:id', checkToken, noteServices.getNoteByIdAndUser);

router.put('/api/notes/:id', checkToken, noteServices.putNotebyIdAndUser);

router.patch('/api/notes/:id', checkToken, noteServices.patchNoteByIdAndUser);

router.delete('/api/notes/:id', checkToken, noteServices.deleteNoteByIdAndUser);

module.exports = router;