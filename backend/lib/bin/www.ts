#!/usr/bin/env node-ts
import app from '../app';
import * as http from 'http';
var models = require('../models');
//require('dotenv').config();
var port = process.env.PORT || 8000;
app.set("port", port)

var server = http.createServer(app);

models.sequelize
.sync()
.then(function(){
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);
  console.log('Notes table should have been created if non existant')
}).catch(err => console.log(err))

function onError(error) { 
  if (error.syscall !== "listen") { 
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) { 
    case "EACCESS":
      console.error(bind + " requires elevated privliges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      console.log('logging default error')
      throw error;
  }
}

function onListening() {
  console.log(`Server listening on port ${port}`);
}