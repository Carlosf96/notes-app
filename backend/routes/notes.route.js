const express = require('express');
const router = express.Router();
const controller = require('../controllers/Notes.controller');

router
  .route('/')
  .get(controller.getAllNotes)
  .post(controller.createNote);

router
  .route('/:id')
  .put(controller.updateNote)
  .delete(controller.deleteNote);

module.exports = router;