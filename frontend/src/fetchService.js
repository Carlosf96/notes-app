const FetchNoteService = () => {
  const saveNote = async note =>{
    const res = await window.fetch("http://localhost:8000/api/notes/", {
      method: "GET",
      body: note
    });
    const data = await res.json();
    Promise.resolve(data);
    console.log("Note has been saved");
  };
  const updateNote = async note => {
    const res = await window.fetch(`http://localhost:8000/api/notes/${id}`, {
      method: "PUT",
      body: note
    });
    const data = await res.json();
    Promise.resolve(data);
    console.log("note has been updated");
  };
  const deleteNote = async id => {
    const res = await window.fetch(`http://localhost:8000/api/notes/${id}`, {
      method: "DELETE"
    });
    const data = await res.json();
    Promise.resolve(data);
    console.log("note has been deleted");
  };
  return {
    saveNote,
    updateNote,
    deleteNote
  }
}