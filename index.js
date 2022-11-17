#!/usr/bin/env node
const os = require('os')
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const HOMEDIR = os.homedir()
let config = {}
if (os.platform() === 'win32') {

}
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
  if (fs.existsSync(path.join(HOMEDIR, '.revise', 'key'))) {
    const key = 'API KEY HERE...'
    console.log(`==========COPY AND STORE THE API KEY===========`);
    console.log(key);
    console.log(`===============================================`);
    return
  }
  console.log(`No API key found. Please generate one first. Check docs at https://docs.revise.network`);
  console.log('');
  console.log('');
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
  if (!fs.existsSync(path.join(HOMEDIR, '.revise'))) {
    console.log('Revise config folder not found');
    fs.mkdirSync((path.join(HOMEDIR, '.revise')))
  } else {
    console.log('Revise config folder found');
  }
  if (! fs.existsSync(path.join(HOMEDIR, '.revise', '.env'))) {
    console.log('Env config file not found');
    config = require('./default-config')
    config.DATABASE_URL = 'file:'+path.join(HOMEDIR, '.revise', 'revise-server-local-database')+'.db'
    fs.writeFileSync(path.join(HOMEDIR, '.revise', '.env'), JSON.stringify(config))
    console.log('Added default config data to .env file')
  } else {
    config = JSON.parse(fs.readFileSync(path.join(HOMEDIR, '.revise', '.env')).toString())
  }
  console.log('Loading config data...');
  let env = process.env
  process.env = {...env, ...config}
  if (! fs.existsSync(path.join(HOMEDIR, '.revise', 'revise-server-local-database.db'))) {
    console.log('Generating the SQLite DB file...');
    const d = JSON.parse(fs.readFileSync(path.join(HOMEDIR, '.revise', '.env')).toString())
    process.env = {...process.env, ...(d)}
    exec(`npx prisma migrate deploy`, (error, stdout, stderr) => {
      // if (error) {
      //     console.log(`error: ${error.message}`);
      //     return;
      // }
      // if (stderr) {
      //     console.log(`stderr: ${stderr}`);
      //     return;
      // }
      // console.log(`stdout: ${stdout}`);
    });
  }

  if (! fs.existsSync(path.join(HOMEDIR, '.revise', 'key'))) {
    const key = 'API KEY HERE...'
    console.log();
    console.log();
    console.log(`==========COPY AND STORE THE API KEY===========`);
    console.log(key);
    console.log(`===============================================`);
    fs.writeFileSync(path.join(HOMEDIR, '.revise', 'key'), key)
  }

  // starting the revisejs server
  console.log();
  console.log();
  require('revisejs-server');
  return
}
console.log(`Invalid command`);
