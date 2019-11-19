const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const notesRouter = require('./routes/notes.route');
const logger = morgan('dev');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger);

app.use('/api/notes', notesRouter);

module.exports = app;