const dayjs = require("dayjs");
const connection = require("../../db/connection");


function age() {
    const today = dayjs(new Date()).format("DD/MM/YYYY").split("/");

    connection.query("SELECT id, dob FROM caregivers_", (error, results) => {
        if (error) throw error;

        for (let i = 0; i < results.length; i++) {
            if (results[i].dob) {
                let year = results[i].dob.split("-")[0];

                const age = today[2] - year;

                connection.query(`UPDATE caregivers_ SET age = ${age} WHERE id = ${results[i].id};`, (err) => {
                    if (err) throw err;
                });
            }
        }
    });
}

module.exports = age;