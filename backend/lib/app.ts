import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as compression from 'compression';
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
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }
}

export default new App().app