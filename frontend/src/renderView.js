window.addEventListener('online', () => {
   setTimeout(function(){
     syncNotes(offlineNotes)
     M.toast({html: 'Your notes have been synced successfully'})
   }
   , 5000);

})
window.addEventListener('offline', () => {
  M.toast({html: 'You are offline'})
})
const $ = selector => document.querySelector(selector);
const { localStorage } = window;
const online = navigator.onLine;
const saveOfflineChange = () => localStorage.setItem('notesArr', JSON.stringify(offlineNotes));
let offlineNotes = JSON.parse(localStorage.getItem('notesArr')) || [];
const createNewNote = note => `
  <li class='list-item' id=${note.id || 'single-note'}>
    <form id=${note.id + '%'} class='input-forms' onsubmit="saveNoteContent(this)">
      <div class='note-title'>
      <input class='title-input' type='text:not' autocomplete='off' type='submit' id=${note.id + '-title'} placeholder=${note.title || 'Title'}>
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
//  Add a spinner or something to indicate saving and saved state
// Add offline view:
//  if a note is saved locally add indicator that it is saved locally
//  listen to close tab event and have a pop up asking user if he wants to close or not because notes havent been synced
const generateId = () => Math.random().toString(36).substring(7) + '-temp';
const saveAfterWhile = (e) => {
  event.preventDefault();
  (() => {
    e.style.height = '50px';
    e.style.height = e.scrollHeight + 12 + 'px';
  })(e)
  saveNoteContent(event);
};
const syncNotes = (notes) => {
  notes.map(note => {
    let title = note.title
    let body = note.body
    FetchNoteService.createNote({
      title,
      body,
    })
  })
}
const createAndAddToList = () => {
  if (online) {
    FetchNoteService
      .createNote({
        noteTitle: '',
        noteBody: '',
      })
      .then(res => addToList(createNewNote(res.note)))
      .catch(err => console.log(err));
  } else {
    offlineNotes.push({
      id: generateId(),
      noteTitle: '',
      noteBody: '',
    })
    addToList(createNewNote(offlineNotes[offlineNotes.length - 1]));
    saveOfflineChange();
  };
};
const deleteAndRemoveFromList = (element) => {
  event.preventDefault();
  const theId = element.id;
  if(online){
    FetchNoteService
      .deleteNote(theId)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    removeFromList(theId);
  } else {
    offlineNotes = offlineNotes.filter(note => note.id !== theId);
    saveOfflineChange();
    removeFromList(theId);
  }
};
const saveNoteContent = (event) => {
  console.log(event)
  const { target } = event;
  event.preventDefault();
  let theId;
  let noteTitle;
  let noteBody;
  if (event.type === 'input') {
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
  if(online){
    setTimeout(function(){
      FetchNoteService
        .updateNote(theId, updatedNote)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    },5000)
  } else {
    const noteIdx = offlineNotes.findIndex(e=> e.id === theId);
    offlineNotes[noteIdx] = updatedNote;
    saveOfflineChange();
  }
};
const getList = () => $('.list');
const addToList = li => getList().insertAdjacentHTML('beforeend', li);
const removeFromList = id => $('#' + id).remove();
const renderNewNote = () => addToList(createNewNote())();
const renderNotes = ({ notes }) => notes.map(note => addToList(createNewNote(note)));
const renderOfflineNotes = (notes) => notes.map(note => addToList(createNewNote(note)))
if (online) {
  FetchNoteService.getNotes().then(notes => renderNotes(notes));
} else {
  FetchNoteService.getNotes().then(notes => renderNotes(notes));
  renderOfflineNotes(offlineNotes);
} 