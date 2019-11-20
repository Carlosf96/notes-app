const cuid = require("cuid");
let notes = [];
module.exports.getAllNotes = (req, res) => {
  return res.status(200).json({
    notes,
  });
};
module.exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { noteTitle, noteBody } = req.body;
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex < 0) {
    return res.status(400).json({});
  }
  notes[noteIndex] = {
    id,
    noteTitle,
    noteBody,
  };
  res.status(200).json({
    note: notes[noteIndex]
  });
  console.log(notes);
};
module.exports.createNote = (req, res) => {
  const note = req.body;
  const newNote = {
    id: cuid(),
    ...note,
  };
  notes.push(newNote);
  res.status(201).json({ note: newNote });
};
module.exports.deleteNote =  (req, res) => {
  const { id } = req.params;
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex < 0) {
    return res.status(400).json({ message: 'ID does not exist'});
  }
  notes = notes.filter(note => note.id !== id);
  res.status(204).json({ message: 'User has been deleted'});
};