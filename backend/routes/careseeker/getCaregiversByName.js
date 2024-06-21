const connection = require("../../db/connection");

function getCaregiversByName(req, res) {
    const { name } = req.query;

    connection.query(`SELECT id, fname, lname, gender, status, imageUrl, rating, languages, isVerified, speciality, experience, comfortableWithPets, task, rate, daysAWeek, workingHrs, bio, distance FROM caregivers_ WHERE (LOCATE('${name}', fname) != 0 OR LOCATE('${name}', lname) != 0) AND isVerified = TRUE`, (error, results) => {
        if (error) throw error;

        res.status(200).json(results);
    })
}

module.exports = getCaregiversByName; 