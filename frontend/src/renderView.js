const $ = selector => document.querySelector(selector);
const createNewNote = note => `
  <li class='list-item' id=${note.id || 'single-note'}>
    <form id=${note.id + '%'} class='input-forms' onsubmit="saveNoteContent()">
      <div class='note-title'>
      <input class='title-input' type='text' id=${note.id + '-title'} placeholder=${note.title || 'Title'}>
      <i type='text' class='delete-button' id=${note.id + '%'} onclick="deleteAndRemoveFromList()">x</i>
      </div>
      <textarea class='body-input'  type='text' form=${note.id + '%'} id=${note.id + '-body'} placeholder=${note.body || 'Body'}>
      ${note.body || 'Body'}
      </textarea>
      <input class='hidden-button' type='submit'>
    </form>
  </li> 
  `;
// TODOS:
// Change second input to textarea:
//  Make textarea resizable
//  textarea will be a certain size up until a certain point
//  the resizable area will only be till a certain size as well
// Add eventlistener to listen on keyup event to set a timer to make a request:
//  Make note save after time has run out
//  Add a spinner to indicate saving and saved state
// Add offline view:
//  add indication that the user is offline
//  when offline user should be able to save notes to localstorage or cache
//  when creating a new note offline will add a temporary id
//    this id will be changed on the backend when notes are synced
//  add functionality that would allow user to sync changes to database when user reconnects
//  perhaps this would be optional and not forced
//  perhaps user can sync only some changes and not others
//  listen to close tab event and have a pop up asking user if he wants to close or not because notes havent been synced
// 
//  

const createAndAddToList = () => {
  FetchNoteService
    .createNote({
      noteTitle: '',
      noteBody: '',
    })
    .then(res => addToList(createNewNote(res.note)))
    .catch(err => console.log(err));
};
const deleteAndRemoveFromList = () => {
  event.preventDefault();
  const theId = [...event.srcElement.id].filter(e => e !== '%').join('');
  FetchNoteService
    .deleteNote(theId)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  removeFromList(theId);
};
const saveNoteContent = () => {
  event.preventDefault();
  const { target } = event;
  console.log(target[0].value, target[1].value);
  const theId = [...event.srcElement.id].filter(e => e !== '%').join('');
  const noteTitle = !target[0].value ? target[0].placeholder : target[0].value;
  const noteBody = !target[1].value ? target[1].placeholder : target[1].value;
  const updatedNote = {
    id: theId,
    title: noteTitle,
    body: noteBody,
  };
  FetchNoteService
    .updateNote(theId, updatedNote)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  window.location.reload(false);
};
const getList = () => $('#list');
const addToList = li => getList().insertAdjacentHTML('beforeend', li);
const removeFromList = id => $('#'+id).remove();
const renderNewNote = () => addToList(createNewNote())();
const renderNotes = ({ notes }) => notes.map(note => addToList(createNewNote(note)));
FetchNoteService.getNotes().then(notes => renderNotes(notes));