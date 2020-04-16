const Pool = require('pg').Pool;
const pool = new Pool({
    user : "postgres",
    password : "qwerty",
    host : "localhost",
    port : 5432,
    database : "tododb"
});

pool.connect((err, client, release) => {
    console.log("connected to do")
  })

module.exports = pool;