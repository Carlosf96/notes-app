const createNewNote = note => `
  <li class='list-item' id=${note.id || 'single-note'}>
    <form id=${note.id + '1'} class='input-forms' onsubmit="saveNoteContent()">
      <div class='note-title'>
        <i type='text' class='delete-button' id=${note.id + '1'} onclick="deleteAndRemoveFromList()">x</i>
        <input class='title-input' type='text' id=${note.id + '-title'} placeholder=${note.noteTitle || 'Title'}>
      </div>
      <input class='body-input'  type='text' id=${note.id + '-body'} placeholder=${note.noteBody || 'Body'}>
      <input class='hidden-button' type='submit'>
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
  event.preventDefault();
  const notTheId = [...event.srcElement.id];
  notTheId.pop();
  const theId = notTheId.join('');
  FetchNoteService()
    .deleteNote(theId)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  removeFromList(theId);
};

const saveNoteContent = () => {
  event.preventDefault();
  const notTheId = [...event.srcElement.id]
  notTheId.pop();
  const theId = notTheId.join('');
  const noteTitle = !event.target[0].value ? event.target[0].placeholder : event.target[0].value;
  const noteBody = !event.target[1].value ? event.target[1].placeholder : event.target[1].value;
  const updatedNote = {
    theId,
    noteTitle,
    noteBody,
  }
  console.log(updatedNote, 'this the update');
  FetchNoteService()
    .updateNote(theId, updatedNote)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  window.location.reload(false);
};
const getList = () => document.getElementById('list');
const addToList = li => getList().insertAdjacentHTML('beforeend', li);
const removeFromList = id => document.getElementById(id).remove();
const renderNewNote = () => addToList(createNewNote())();
const renderNotes = ({ notes }) => notes.map(note => addToList(createNewNote(note)));

document.onload = FetchNoteService().getNotes().then(notes => renderNotes(notes));