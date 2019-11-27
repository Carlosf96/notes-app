
window.addEventListener('online', () => {
  if(offlineNotes.length > 0){
    setTimeout(function(){
      syncNotes(offlineNotes)
      M.toast({html: 'Your notes have been synced successfully'})
      offlineNotes = [];
      saveOfflineChange();
      $('.offline-message').remove();
    }
    , 3000);
  } else {
    $('.offline-message').remove();
    M.toast({html: 'You are now online'})
  }
})
window.addEventListener('offline', () => {
  $('body').insertAdjacentHTML('afterbegin', offlineIndicator)
  M.toast({html: 'You are offline'})
})

if (online) {
  FetchNoteService.getNotes().then(notes => renderNotes(notes));
} else {
  $('body').insertAdjacentHTML('afterbegin', offlineIndicator)
  FetchNoteService.getNotes().then(notes => renderNotes(notes));
  renderOfflineNotes(offlineNotes);
}