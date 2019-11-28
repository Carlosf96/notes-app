const cuid = require("cuid");
const Note = require("../models").Note;
export class NotesController {
  public getAllNotes = (req, res) => {
    return Note.findAll()
      .then(notes => res.status(200).json({
        notes
      }))
      .catch(err => res.json({ message : err }));
  };
  public updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    Note.update({
        title: title,
        body: body
      }, {
        where: {
          id: id
        }
      })
      .then(() => res.status(200).json({
        message: "Note has been updated"
      }))
      .catch(err => res.json({ message : err }));
  };
  public syncNotes = (req, res) => {
    req.body.map(note => {
      Note.create({
        id: cuid(),
        title: note.title,
        body: note.body
      })
      .then(() => res.status(201).json({
        note: req.body
      }))
      .catch(err => res.json({ message : err }));
    })
  };
  public createNote = (req, res) => {
    const { title, body } = req.body;
    console.log(req.body, 'should not be empty')
    const newNote = {
      id: cuid(),
      title,
      body
    };
    Note.create({
        ...newNote
      })
      .then(() => res.status(201).json({
        note: newNote
      }))
      .catch(err => res.json({ message : err }));
  };
  public deleteNote = (req, res) => {
    const { id } = req.params;
    Note.destroy({
      where: {
        id: id
      }
    })
    .then(()=> res.status(200).json({ message: 'Note has been deleted'}))
    .catch(err => res.json({ message : err }));
  };
};