const online = navigator.onLine;
const { localStorage } = window;
let offlineNotes = JSON.parse(localStorage.getItem('notesArr')) || [];
let newHeight;
const $ = selector => document.querySelector(selector);
const reDraw = (e) => {

  e.style.display = 'hidden';
};
const reSize = (e) => e.style.height = e.scrollHeight + 12 + 'px';
const generateId = () => Math.random().toString(36).substring(7) + '-temp'; 
const getList = () => $('.list');
const addToList = li => getList().insertAdjacentHTML('beforeend', li);
const removeFromList = id => $('#' + id).remove();
const renderNewNote = () => addToList(createNewNote())();
const renderNotes = ({ notes }) => notes.map(note => addToList(createNewNote(note)));
const renderOfflineNotes = (notes) => notes.map(note => addToList(createNewNote(note)));
const rndrOnlnNotes = ({notes}) => notes.map(note => addToList(offlineNewNote(note)));
const saveOfflineChange = () => localStorage.setItem('notesArr', JSON.stringify(offlineNotes));