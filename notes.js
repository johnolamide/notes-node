const fs = require('fs');

var fetchNotes = () =>{
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
      return [];
  }
};

var saveNote = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) =>{
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0){
    notes.push(note);
    saveNote(notes);
    return note;
  }

};

var getAll = () => {
  return fetchNotes();
};

var getNote = (title) => {
  // fetch the notes
  notes = fetchNotes();
  // filter notes
  var filteredNotes = notes.filter((note) => note.title === title);
  // return the match
  return filteredNotes[0];
};

var remove = (title) => {
  // fetch the notes
  notes = fetchNotes();
  // return the notes that does not match the not with the title argument
  var filteredNotes = notes.filter((note) => note.title !== title);
  // save the filtered Notes
  saveNote(filteredNotes);

  return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
  console.log('----------');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}

module.exports = {
  addNote,
  getAll,
  getNote,
  remove,
  logNote
};
