const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database. The database file does not need to exist
// when connecting; if it doesn't exist, SQLite will create it.
const db = new sqlite3.Database('database/base.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

module.exports = db;
