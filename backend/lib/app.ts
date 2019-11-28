import * as express from 'express';
const morgan = require('morgan');
const cors = require('cors');
const logger = morgan('dev');
const compression = require('compression');
const notesRouter = require('./routes/notes.route');
const app = express();

class App {
  public app: express.Application;
  constructor(){
    this.app = express();
    this.config();
  }
  private config(): void{
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(logger);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use('/api/notes', notesRouter);
  }
}

// app.use(cors());
// app.use(compression());
// app.use(logger);
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use('/api/notes', notesRouter);
export default new App().app