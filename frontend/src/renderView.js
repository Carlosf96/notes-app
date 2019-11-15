const createNewNote = note => `
  <li class='list-item' id=${note.id || 'single-note'}>
    <form class='input-forms' onsubmit="saveNoteContent()">
      <div class='note-title'>
        <i type='text' class='delete-button' id=${note.id +
          '1'} onclick="deleteAndRemoveFromList()">x</i>
        <input class='title-input' id=${note.id + '-title'} placeholder=${
  note.noteTitle ? note.noteTitle : 'Title'
}>
      </div>
      <input class='body-input' id=${note.id + '-body'} placeholder=${
  note.noteBody ? note.noteBody : 'Body'
}>
    </form>
  </li> 
  `;
const createAndAddToList = () => {
  FetchNoteService()
    .createNote({
      noteTitle: '',
      noteBody: ''
    })
    .then(res => addToList(createNewNote(res.note)))
    .catch(err => console.log(err));
};

const deleteAndRemoveFromList = () => {
  const notTheId = event.srcElement.id.split('');
  notTheId.pop();
  const theId = notTheId.join('');
  FetchNoteService()
    .deleteNote(theId)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  removeFromList(theId);
};

const saveNoteContent = (id, note) => {
  event.preventDefault();
  FetchNoteService()
    .updateNote(id, note)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
const getList = () => document.getElementById('list');
const addToList = li => getList().insertAdjacentHTML('beforeend', li);
const removeFromList = id => document.getElementById(id).remove();
const renderNewNote = () => addToList(createNewNote())();
const renderNotes = ({ notes }) => notes.map(note => addToList(createNewNote(note)));

document.onload = FetchNoteService().getNotes().then(notes => renderNotes(notes));
