const express = require('express');
const router = express.Router();
const controller = require('../controllers/Notes.controller');

router
  .route('/')
  .get(controller.getAllNotes)
  .put(controller.updateNote)
  .post(controller.createNote)
  .delete(controller.deleteNote);


module.exports = router;