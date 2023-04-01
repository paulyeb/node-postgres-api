const Pool = require('pg').Pool;


const pool = new Pool({
    user: 'paultester',
    password: 'tester',
    host: 'localhost',
    port: 5432,
    database: 'NodePostgresDatabase'
});

// const pg = require('pg');
// const conString = "postgres://paultester:tester@localhost:5432/NodePostgresDatabase";

// const pool = new pg.Client(conString);
// pool.connect();

module.exports = pool;