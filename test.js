const d = require('./default-config')
d.DATABASE_URL = 'file:./test.db'
process.env = {...process.env, ...d}
require('revisejs-server').startService()