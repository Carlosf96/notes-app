const offlineNewNote = note => `
  <li class='list-item col s12 m12 l3' id=${note.id || 'single-note'}>
    <form id=${note.id + '%'} class='input-forms' onsubmit='saveNoteContent(this)'>
      <div class='note-title'>
        <input 
          class='title-input' 
          type='text:not' 
          autocomplete='off' 
          type='submit' 
          id='${note.id + '-title'}'
          placeholder='${note.title || 'Title'}'/>
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