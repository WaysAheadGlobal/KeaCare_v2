const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "103.239.89.99",
    user: "KeaCareDBUsr",
    database: "KeaCare_DB",
    password: "w!K2310in"
});


module.exports = connection;