const createNewNote = note => {
  return `
  <li class='list-item' id=${note.id || 'single-note'}>
    <form class='input-forms'>
      <div class='note-title'>
        <button class='delete-button' id=${note.id+'1'} onclick="deleteAndRemoveFromList()">x</button>
        <input class='title-input' placeholder=${
          note.noteTitle ? note.noteTitle : 'Title'
        }>
      </div>
      <input class='body-input' placeholder=${note.noteBody ? note.noteBody : 'Body'}>
    </form>
  </li> 
  `;
};
const createAndAddToList = () => {
  FetchNoteService()
    .createNote({
      noteTitle: '',
      noteBody: ''
    })
    .then(res => addToList(createNewNote(res.note)));
};
const deleteAndRemoveFromList = () => {
  const notTheID = event.srcElement.id.split('');
  notTheID.pop();
  const theId = notTheID.join('');
  console.log(notTheID,theId)
  FetchNoteService().deleteNote(theId).then(res => console.log(res));
}
const getList = () => document.getElementById('list');
const addToList = li => getList().insertAdjacentHTML('beforeend', li);
const removeFromList = id => document.getElementById(id).remove();
const renderNewNote = () => addToList(createNewNote())();
const renderNotes = ({ notes }) => notes.map(note => addToList(createNewNote(note)));

document.onload = FetchNoteService().getNotes().then(notes => renderNotes(notes));