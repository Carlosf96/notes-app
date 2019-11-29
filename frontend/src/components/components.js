const createNewNote = note => `
  <li class='col s12 m12 l3' id=${note.id || 'single-note'}>
    <form id=${note.id + '%'} class='list-item input-forms' onsubmit='saveNoteContent(this)'>
      <div class='note-title'>
        <input 
          class='title-input' 
          type='text:not' 
          autocomplete='off' 
          type='submit' 
          id='${note.id + '-title'}'
          placeholder='${note.title || 'Title'}'/>
        <i 
          class='delete-button' 
          type='text'  
          id='${note.id}' 
          onclick='deleteAndRemoveFromList(this)'>x</i>
      </div>
      <textarea class='body-input flow-text' 
        oninput='saveAfterWhile(this)' 
        type='text'
        form='${note.id + '%'}' 
        id='${note.id + '-body'}' 
        placeholder='${note.body || 'Body'}'>${note.body || ''}</textarea>
    </form>
  </li> 
  `;
const offlineIndicator = (() =>`
  <div class='offline-message row'>
    <p class='col s1 m6 l3'>
      You are offline
      <i class='medium material-icons'>cloud_off</i>
    </p>
  </div>
`)();