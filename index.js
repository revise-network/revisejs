#!/usr/bin/env node
const args = process.argv;
if (args.length <= 2) {
  console.log(`enter a valid command`);
  return
}
const command = args[2];
if (command === 'print-key') {
  console.log(`Your API Key is `);
  return
}
if (command === 'generate-key') {
  console.log(`New Key generated. Your API Key is `);
  return
}
if (command === 'start') {
  require('revisejs');
  return
}
console.log(`Invalid command`);
