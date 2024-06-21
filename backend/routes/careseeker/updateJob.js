const connection = require("../../db/connection");
const { validationResult } = require("express-validator");

function UpdateJob(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty() && errors.errors[0].path === 'email') {
        res.status(400).send('Invalid email address. Please try again.');
    } else {
        const { jid, speciality, time, additionalService, languages, hourlyRate, experience, age, location, comfortableWithPets, rating, availability, jobDescription, date } = req.body;
        
        connection.query(`
        UPDATE jobs_
        SET
            additionalService = '${additionalService}',
            age = '${age}',
            availability = ${availability},
            comfortableWithPets = ${comfortableWithPets ? 1 : 0},
            experience = ${experience},
            hourlyRate = ${hourlyRate},
            jobDescription = '${jobDescription}',
            language = '${languages}',
            location = '${location}',
            rating = ${rating},
            speciality = '${speciality}',
            time = '${time}',
            status = 'active',
            modifiedOn = NOW(),
            date = '${date}'
            WHERE id = ${jid}`, (error, results) => {
            if (error) throw error;

            res.status(200).json({ success: true });
        });
    }
}

module.exports = UpdateJob;