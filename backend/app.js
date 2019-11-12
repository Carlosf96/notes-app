const express = require('express');
const dev = require('morgan');
// const mongoose = require('mongoose');
// require('dotenv').config();
// const db = process.env.MONGO_URI;
const notesRouter = require('./routes/notes.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mongoose.connect(db, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false ,
// })
// .then(()=>console.log('Connected to Mongodb Cloud Cluster'))
// .catch((err)=>{
//   console.log(err);
//   process.exit();
// });

app.use('/api/notes', notesRouter);

module.exports = app;