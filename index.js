#!/usr/bin/env node
const args = process.argv;
if (args.length <= 2) {
  console.log(`enter a valid command`);
  return
}
const command = args[2];
if (command === 'print-key') {
  // check if .revisejs folder is created
  // if not: create it in the users home directory
  // check if key is created
  // if not: print "no key found.. please make one"
  console.log(`Your API Key is `);
  return
}
if (command === 'generate-key') {
  // check if .revisejs folder is created
  // if not: create it in the users home directory
  // check if key is created
  // if not: create it
  console.log(`New Key generated. Your API Key is `);
  return
}
if (command === 'start') {
  // check if .revisejs folder is created
  // if not: create it in the users home directory
  // check if there is a .env file there
  // if not: create it
  // check if the sqlite file is created
  // if not: create it
  // check if key is created
  // if not: create it

  // starting the revisejs server
  require('revisejs');
  return
}
console.log(`Invalid command`);
