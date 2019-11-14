document.body.onload = loadNotes;

var loadNotes = (async () => {
  var res = await window.fetch("http://localhost:8000/api/notes/");
  var data = await res.json();
  Promise.resolve(data);
  createNoteComponent(data);
  document.getElementById("add-button").onclick = createNewNote;
  document.getElementById("delete-button").onclick = deleteNote;
  return data;
})();

// const { notes } = loadNotes;

var createNoteComponent = ({ notes }) => notes.map(note => createNewNote(note));

var createNewNote = note => {
 const list = document.getElementById('list');
 let li = `
   <li class='list-item'>
     <button id='delete-button'>x</button>
     <input placeholder=${note.noteTitle || 'Title'}>
     <input placeholder=${note.noteBody || 'Body'}>
   </li> 
`;
 list.insertAdjacentHTML('afterend', li);
}         


var deleteNote = async (id) => {
  var res = await window.fetch(`http://localhost:8000/api/notes/${id}`, {
    method: "DELETE"
  });
  var data = await res.json();
  Promise.resolve(data);
  console.log("note has been deleted");
};