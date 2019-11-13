module.exports.getAllNotes = (req, res) => {
  const cuid = require("cuid");
  var notes = [
    {
      id: cuid(),
      noteTitle: "Title",
      noteBody: "Body"
    }
  ];
  return res.json({
    notes
  });
};
module.exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { noteBody, noteTitle } = req.body;
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex < 0) {
    return res.status(400).json({});
  }
  notes[noteIndex] = {
    ...notes[noteIndex],
    noteTitle,
    noteBody
  };
  res.status(200).json({
    note: notes[noteIndex]
  });
};
module.exports.createNote = (req, res) => {
  const cuid = require("cuid");
  const note = req.body;
  const notes = [
    {
      id: cuid(),
      noteTitle: "Title",
      noteBody: "Body"
    }
  ];
  const newNote = {
    id: cuid(),
    ...note
  };
  notes.push(newNote);
  res.status(201).json({ note: newNote });
};
module.exports.deleteNote =  (req, res) => {
  const { id } = req.params;
  var notes = this.getAllNotes(req,res);
  console.log(notes, 'these are the notes')
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex < 0) {
    return res.status(400).json({});
  }
  notes = notes.filter(note => note.id === id);
  res.status(204).json({});
};
