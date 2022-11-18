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
  if (fs.existsSync(path.join(HOMEDIR, '.revise', 'key'))) {
    const key = fs.readFileSync(path.join(HOMEDIR, '.revise', 'key')).toString();
    console.log('');
    console.log('');
    console.log(`========== COPY AND STORE THE API KEY ===========`);
    console.log(key);
    console.log(`=================================================`);
    console.log('');
    console.log('');
    return
  }
  console.log('');
  console.log('');
  console.log(`No API key found. Please generate one first. Check docs at https://docs.revise.network`);
  console.log('');
  console.log('');
  return
}
if (command === 'generate-key') {
  if (!fs.existsSync(path.join(HOMEDIR, '.revise'))) {
    console.log('');
    console.log(`======== Unable to generate key ========`);
    console.log(`Unable to generate Key. Revise project is not initialised.`);
    console.log(`Please run the following command to init the app first: npx revisejs start`);
    console.log('');
    console.log('');
    return;
  }
  config = JSON.parse(fs.readFileSync(path.join(HOMEDIR, '.revise', '.env')).toString())
  let env = process.env
  process.env = {...env, ...config}
  require('revisejs-server').generateToken()
  .then(token => {
    console.log('');
    console.log('');
    console.log('========== KEY GENRATED, SAVE THE API KEY ===========');
    console.log(`${token}`);
    console.log('=====================================================');
    console.log('');
    console.log('');
    fs.writeFileSync(path.join(HOMEDIR, '.revise', 'key'), token)
  })
  return
}
if (command === 'start') {
  if (!fs.existsSync(path.join(HOMEDIR, '.revise'))) {
    console.log('Revise config folder created');
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
    exec(`npx prisma migrate deploy --schema ${path.join(__dirname, 'prisma', 'schema.prisma')}`, (error, stdout, stderr) => {
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

  async function startService() {
    if (! fs.existsSync(path.join(HOMEDIR, '.revise', 'key'))) {
      const key = await require('revisejs-server').generateToken()
      console.log();
      console.log();
      console.log(`========== COPY AND STORE THE API KEY ===========`);
      console.log(key);
      console.log(`=================================================`);
      fs.writeFileSync(path.join(HOMEDIR, '.revise', 'key'), key)
    }
  
    // starting the revisejs server
    console.log();
    console.log();
    require('revisejs-server').startService();
  }
  startService().then(e => {

  })
  
  return
}
console.log(`Invalid command`);
