import { NotesController } from '../controllers/Notes.controller';
export class Routes {
  public notesController: NotesController = new NotesController();
  public routes(app): void {
    app
      .route('/api/notes/')
      .get(this.notesController.getAllNotes)
      .post(this.notesController.createNote);
    app
      .route('/api/notes/sync')
      .post(this.notesController.syncNotes)
    app
      .route('/api/notes/:id')
      .put(this.notesController.updateNote)
      .delete(this.notesController.deleteNote);
  }
};