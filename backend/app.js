const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const logger = morgan('dev');
const compression = require('compression');
const notesRouter = require('./routes/notes.route');
const app = express();

app.use(cors());
app.use(compression());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/notes', notesRouter);

module.exports = app;