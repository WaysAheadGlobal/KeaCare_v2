const connection = require("../../db/connection");
const dayjs = require("dayjs");

function Expiry() {
    const today = dayjs(new Date()).format("DD/MM/YYYY").split("/");

    connection.query("UPDATE careseekers_ SET status = 'inactive' WHERE expiryDate < NOW()", (error) => {
        if (error) throw error;
    });

    /* connection.query("SELECT id, dob FROM caregivers_", (error, results) => {
        if (error) throw error;

        for (let i = 0; i < results.length; i++) {
            let year = results[i].dob.split("-")[0];
            let month = results[i].dob.split("-")[1];

            let sqlQuery = "";
            if (Number(today[2]) > Number(year)) {
                sqlQuery = `UPDATE caregivers_ SET age = ${parseInt(today[2]) - parseInt(year)} WHERE id = ${results[i].id}`;
            } else if (Number(today[1]) >= Number(month)) {
                sqlQuery = `UPDATE caregivers_ SET age = ${Number(today[2]) - Number(year)} WHERE id = ${results[i].id}`;
            }
            connection.query(sqlQuery, (err) => { throw err; });
        }
    }); */

    connection.query("SELECT id, date, time FROM jobs_", (error, results) => {
        if (error) throw error;

        for (let i = 0; i < results.length; i++) {
            const dates = results[i].date.split(";");
            let count = 0;
            for (let j = 0; j < dates.length; j++) {
                const date = dates[j].split("/");
                if ((Number(date[0]) < Number(today[0]) && date[1] === today[1] && date[2] === today[2]) || (Number(date[1]) < Number(today[1]) && date[2] === today[2]) || (Number(date[2]) < Number(today[2]))) {
                    count++;
                }
            }

            if (count === dates.length) {
                connection.query(`UPDATE jobs_ SET status = 'inactive' WHERE id = ${results[i].id}`, (error) => {
                    if (error) throw error;
                });
            }
        }
    });

    connection.query("SELECT id, date, time FROM appointments_", (error, results) => {
        if (error) throw error;

        for (let i = 0; i < results.length; i++) {
            const dates = results[i].date.split(";");
            let count = 0;
            for (let j = 0; j < dates.length; j++) {
                const date = dates[j].split("/");
                if ((Number(date[0]) < Number(today[0]) && date[1] === today[1] && date[2] === today[2]) || (Number(date[1]) < Number(today[1]) && date[2] === today[2]) || (Number(date[2]) < Number(today[2]))) {
                    count++;
                }
            }

            if (count === dates.length) {
                connection.query(`UPDATE appointments_ SET status = 'Completed' WHERE id = ${results[i].id}`, (error) => {
                    if (error) throw error;
                });
            }
        }
    });
}

module.exports = Expiry;