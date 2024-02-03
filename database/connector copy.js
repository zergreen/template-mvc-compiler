const mysql = require('mysql2');

const connect = mysql.createConnection({
    host: '127.0.0.1',
    database: 'phongsakorn_mvc',
    port: 3306,
    user: 'root',
    password: 'root',
});

connect.connect(function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Database Connected !");
    }
});
module.exports = connect;