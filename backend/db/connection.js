const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "103.145.51.250",
    user: "KeaCareDBUsr",
    database: "KeaCare_DB",
    password: "w!K2310in"
});

/* const connection = mysql.createConnection({
    database: "keacare",
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "2212"
});
 */
module.exports = connection;