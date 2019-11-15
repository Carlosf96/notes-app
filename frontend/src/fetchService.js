const FetchNoteService = () => {
  const getNotes = async () => {
    const res = await window.fetch("http://localhost:8000/api/notes/");
    const data = await res.json();
    console.log(data, 'Retrieved notes');
    return Promise.resolve(data);
  };
  const saveNote = async note => {
    const res = await window.fetch("http://localhost:8000/api/notes/", {
      method: "POST",
      body: note
    });
    const data = await res.json();
    console.log("Note has been saved");
    return Promise.resolve(data);
  };
  const updateNote = async note => {
    const res = await window.fetch(`http://localhost:8000/api/notes/${id}`, {
      method: "PUT",
      body: note
    });
    const data = await res.json();
    console.log("note has been updated");
    return Promise.resolve(data);
  };
  const deleteNote = async id => {
    const res = await window.fetch(`http://localhost:8000/api/notes/${id}`, {
      method: "DELETE"
    });
    const data = await res.json();
    console.log("note has been deleted");
    return Promise.resolve(data);
  };
  return {
    getNotes,
    saveNote,
    updateNote,
    deleteNote
  };
};