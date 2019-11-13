document.body.onload = loadNotes;

var loadNotes = (async (req, res) => {
    var res = await window.fetch('http://localhost:8000/api/notes/');
    var data = await res.json();
    Promise.resolve(data);
    console.log(data, 'raw data');
    data.map(note=>{
    var list = document.getElementById('list')
    var newNote = document.createElement('li');
    var noteContent = document.createElement('input');
    // noteContent.placeholder = note.noteTitle;
    var noteContent2 = document.createElement('input');
    note.placeholder = note.noteBody;
    newNote.appendChild(noteContent)
    list.appendChild(newNote);
  })
})()