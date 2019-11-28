import * as express from 'express';
const morgan = require('morgan');
const cors = require('cors');
const logger = morgan('dev');
const compression = require('compression');
import { Routes } from './routes/notes.route';
class App {
  public app: express.Application;
  public notesRouter: Routes = new Routes();
  constructor(){
    this.app = express();
    this.config();
    this.notesRouter.routes(this.app);
  }
  private config(): void{
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(logger);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    // this.app.use('/api/notes');
  }
}

export default new App().app