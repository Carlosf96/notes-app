document.body.onload = loadNotes;

var loadNotes = (async () => {
  var res = await window.fetch("http://localhost:8000/api/notes/");
  var data = await res.json();
  Promise.resolve(data);
  createNoteComponent(data);
  document.getElementById("add-button").onclick = createNewNote;
  document.getElementById("delete-button").onclick = deleteNote;
})();

var createNoteComponent = ({ notes }) => notes.map(note => createNewNote(note));

var createNewNote = note => {
  var list = document.getElementById("list");
  var newNote = document.createElement("li");
  var noteContent = document.createElement("input");
  var noteContent2 = document.createElement("input");
  var xButton = document.createElement("button");
  if(!note) {
    noteContent.placeholder = note.noteTitle 
    noteContent2.placeholder = note.noteBody;
  } else {
    noteContent.placeholder = 'Title';
    noteContent2.placeholder = 'Body'
  }
  xButton.innerText = "X";
  xButton.setAttribute("id", "delete-button");
  newNote.appendChild(xButton);
  newNote.appendChild(noteContent);
  newNote.appendChild(noteContent2);
  list.appendChild(newNote);
};

var deleteNote = async (id) => {
  var res = await window.fetch(`http://localhost:8000/api/notes/${id}`, {
    method: "DELETE"
  });
  var data = await res.json();
  Promise.resolve(data);
  console.log("note has been deleted");
};