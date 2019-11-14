document.body.onload = loadNotes;

const newNote = note => {
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

var loadNotes = (async () => {
  const res = await window.fetch("http://localhost:8000/api/notes/");
  const data = await res.json();
  Promise.resolve(data);
  createNoteComponent(data);
  return data;
})();

var updateNote = async (note) => {
  const res = await window.fetch(`http://localhost:8000/api/notes/${id}`, {
    method: "Put",
    body: note
  });
  const data = await res.json();
  Promise.resolve(data);
  console.log("note has been updated")
}

var deleteNote = async id => {
  const res = await window.fetch(`http://localhost:8000/api/notes/${id}`, {
    method: "DELETE"
  });
  const data = await res.json();
  Promise.resolve(data);
  console.log("note has been deleted");
};

// const { notes } = loadNotes;

var addToList = li => {
  let list = document.getElementById("list");
  list.insertAdjacentHTML("beforeend", li);
};

var createNoteComponent = ({ notes }) => notes.map(note => addToList(newNote(note)));
var createNewNoteComponent = () => addToList(newNote());