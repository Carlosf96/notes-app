const saveAfterWhile = (e) => {
  event.preventDefault();
  newHeight = reSize(e);
  setTimeout(saveNoteContent, 2000, event)
};
const syncNotes = (notes) => {
  FetchNoteService
    .syncUp(notes)
    .then(res => console.log(res))
    .catch(err => console.log(err))
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
      FetchNoteService
        .updateNote(theId, updatedNote)
        .then(res => console.log(res))
        .catch(err => console.log(err));
  } else {
    const noteIdx = offlineNotes.findIndex(e=> e.id === theId);
    offlineNotes[noteIdx] = updatedNote;
    saveOfflineChange();
  }
};