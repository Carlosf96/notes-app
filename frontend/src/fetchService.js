document.body.onload = loadNotes;

var loadNotes = (async (req, res) => {
  var res = await window.fetch("http://localhost:8000/api/notes/");
  var data = await res.json();
  Promise.resolve(data);
  console.log(data, "raw data");
  data.notes.map(note => {
    var list = document.getElementById("list");
    var newNote = document.createElement("li");
    var noteContent = document.createElement("input");
    noteContent.placeholder = note.noteTitle;
    var noteContent2 = document.createElement("input");
    noteContent2.placeholder = note.noteBody;
    var xButton = document.createElement("button");
    xButton.innerText = "X";
    newNote.appendChild(xButton);
    newNote.appendChild(noteContent);
    newNote.appendChild(noteContent2);
    list.appendChild(newNote);
  });
})();
