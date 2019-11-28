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
    reDraw($('.container'));
  } else {
    $('.offline-message').remove();
    M.toast({html: 'You are now online'});
    reDraw($('.container'));
  }
})
window.addEventListener('offline', () => {
  $('body').insertAdjacentHTML('afterbegin', offlineIndicator)
  M.toast({html: 'You are offline'})
})

if (online) {
  FetchNoteService.getNotes().then(notes => renderNotes(notes));
  reDraw($('.container'));
} else {
  $('body').insertAdjacentHTML('afterbegin', offlineIndicator)
  FetchNoteService.getNotes().then(notes => rndrOnlnNotes(notes));
  reDraw($('.container'));
  renderOfflineNotes(offlineNotes);
}