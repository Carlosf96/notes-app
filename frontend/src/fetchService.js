const { fetch } = window;
const FetchNoteService = (() => {
  const createNote = async note => {
    const res = await fetch('http://localhost:8000/api/notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note),
    });
    const data = await res.json();
    console.log(data, 'created note');
    return Promise.resolve(data);
  };
  const getNotes = async () => {
    const res = await fetch('http://localhost:8000/api/notes/');
    const data = await res.json();
    console.log(data, 'Retrieved notes');
    return Promise.resolve(data);
  };
  const updateNote = async (id, note) => {
    const res = await fetch(`http://localhost:8000/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    });
    const data = await res.json();
    console.log('note has been updated');
    return Promise.resolve(data);
  };
  const deleteNote = async id => {
    const res = await fetch(`http://localhost:8000/api/notes/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    console.log('note has been deleted');
    return Promise.resolve(data);
  };
  return {
    createNote,
    getNotes,
    updateNote,
    deleteNote,
  };
})();