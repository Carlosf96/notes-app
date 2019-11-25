const cuid = require("cuid");
const Note = require("../models").Note;
  //when syncing notes try to sync all at once
  // Send error message over server
module.exports.getAllNotes = (req, res) => {
  return Note.findAll()
    .then(notes => res.status(200).json({
      notes
    }))
    .catch(err => res.json({ message : err }));
};
module.exports.updateNote = async (req, res) => {
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
module.exports.createNote = (req, res) => {
  const note = req.body;
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
module.exports.deleteNote = (req, res) => {
  const { id } = req.params;
  Note.destroy({
    where: {
      id: id
    }
  })
  .then(()=> res.status(200).json({ message: 'Note has been deleted'}))
  .catch(err => res.json({ message : err }));
};
