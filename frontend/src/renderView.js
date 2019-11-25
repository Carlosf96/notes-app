const $ = selector => document.querySelector(selector);
const createNewNote = note => `
  <li class='list-item' id=${note.id || 'single-note'}>
    <form id=${note.id + '%'} class='input-forms' onsubmit="saveNoteContent()">
      <div class='note-title'>
      <input class='title-input' type='text' type='submit' id=${note.id + '-title'} placeholder=${note.title || 'Title'}>
      <i type='text' class='delete-button' id=${note.id} onclick="deleteAndRemoveFromList(this)">x</i>
      </div>
      <textarea class='body-input' oninput="saveAfterWhile(this)" type='text' form=${note.id + '%'} id=${note.id + '-body'} placeholder=${note.body || 'Body'}>
      ${note.body || 'Body'}
      </textarea>
    </form>
  </li> 
  `;
// TODOS:
// Layout changes:
//  Implement responsive masonry layout using css and javscript
//  look at the google keep for ideas
//  perhaps keep layout simple until a note is clicked then a note will pop up as a modal
// Add eventlistener to listen on keyup event to set a timer to make a request:
//  Make note save after time has run out
//  Add a spinner to indicate saving and saved state
// Add offline view:
//  add indication that the user is offline
//  when offline user should be able to save notes to localstorage or cache
//  when creating a new note offline will add a temporary id
//    this id will be changed on the backend when notes are synced
//    on the backend we will check the id if it has something that indicates that its a temp id
//  add functionality that would allow user to sync changes to database when user reconnects
//  listen to close tab event and have a pop up asking user if he wants to close or not because notes havent been synced

const saveAfterWhile = (e) => {
  (() => {
    e.style.height = '50px';
    e.style.height = e.scrollHeight + 12 + 'px';
  })(e)
  event.preventDefault();
  saveNoteContent(event);
}
const createAndAddToList = () => {
  FetchNoteService
    .createNote({
      noteTitle: '',
      noteBody: '',
    })
    .then(res => addToList(createNewNote(res.note)))
    .catch(err => console.log(err));
};
const deleteAndRemoveFromList = (element) => {
  event.preventDefault();
  const theId = element.id;
  FetchNoteService
    .deleteNote(theId)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  removeFromList(theId);
};
const saveNoteContent = (event) => {
  console.log(event)
  const { target } = event;
  event.preventDefault();
  let theId;
  let noteTitle;
  let noteBody;
  if(event.type === 'input'){
    theId = [...target.form.id].filter(e => e !== '%').join('');
    noteTitle = !target.form[0].value ? target.form[0].placeholder : target.form[0].value;
    noteBody = !target.form[1].value ? target.form[1].placeholder : target.form[1].value; 
  } else {
    theId = [...target.id].filter(e => e !== '%').join('');
    noteTitle = !target[0].value ? target[0].placeholder : target[0].value;
    noteBody = !target[1].value ? target[1].placeholder : target[1].value;
  }
  const updatedNote = {
    id: theId,
    title: noteTitle,
    body: noteBody,
  };
  FetchNoteService
    .updateNote(theId, updatedNote)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  // window.location.reload(false);
};
const getList = () => $('#list');
const addToList = li => getList().insertAdjacentHTML('beforeend', li);
const removeFromList = id => $('#'+id).remove();
const renderNewNote = () => addToList(createNewNote())();
const renderNotes = ({ notes }) => notes.map(note => addToList(createNewNote(note)));
FetchNoteService.getNotes().then(notes => renderNotes(notes));