const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const titleOptions = {
  describe: 'Title of Note',
  demand: true,
  alias: 't'
};

const bodyOptions = {
  describe: 'Body of the Note',
  demand: true,
  alias: 'b'
}

const notes = require('./notes.js');

const argv = yargs
.command('add', 'Add a new note', {
  title: titleOptions,
  body: bodyOptions
})
.command('list', 'List all Notes')
.command('read', 'Read a Note', {
  title: titleOptions
})
.command('remove', 'Remove a Note', {
  title: titleOptions
})
.help()
.argv;
var command = argv._[0];

if (command === 'add'){
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note Created');
    notes.logNote(note);
  } else {
    console.log('Note Title Exists');
  }
}
else if(command === 'list'){
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.logNote(note));
}
else if (command === 'read'){
  var note = notes.getNote(argv.title);

  if (note){
    console.log('Note found');
    notes.logNote(note);
  } else {
    console.log('Note not found');
  }
}
else if (command === 'remove'){
  var noteRemoved = notes.remove(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
}
 else {
  console.log('Command not recognised.');
}
