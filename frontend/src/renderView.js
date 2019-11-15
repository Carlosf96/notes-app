var createNewNote = note => {
  return `
  <li class='list-item'>
  <form class='input-forms'>
  <div class='note-title'>
  <button class='delete-button' onclick="deleteNote()">x</button>
  <input class='title-input' placeholder=${note ? note.noteTitle : "Title"}>
  </div>
  <input class='body-input' placeholder=${note ? note.noteBody : "Body"}>
  </form>
  </li> 
  `;
};
var addToList = li => {
  let list = document.getElementById("list");
  list.insertAdjacentHTML("beforeend", li);
};
var renderNewNote = () => addToList(createNewNote())();
var renderNotes = ({ notes }) => notes.map(note => addToList(createNewNote(note)));
FetchNoteService().getNotes().then(notes=>document.body.onload = renderNotes(notes))