const { validationResult } = require('express-validator');
const connection = require("../../db/connection");

async function PostJob(req, res) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {
            const { job: { speciality, date, time, additionalService, languages, hourlyRate, experience, age, location, comfortableWithPets, rating, availability, jobDescription }, email } = req.body;
            connection.query(`SELECT id FROM careseekers_ WHERE email = '${email}'`, (error, results) => {
                if (error) throw error;

                if (results[0].id) {
                    const sqlQuery = `INSERT INTO jobs_ (userId, additionalService, age, availability, comfortableWithPets, experience, hourlyRate, date, jobDescription, language, location, rating, speciality, time, status, modifiedOn, responses) VALUES (${results[0].id}, '${additionalService}', '${age}', ${availability}, ${comfortableWithPets === "yes" ? 1 : 0}, ${experience}, ${hourlyRate}, '${date}', '${jobDescription}', '${languages}', '${location}', ${rating}, '${speciality}', '${time}', 'active', NOW(), 0)`;

                    connection.query(sqlQuery, (err) => {
                        if (err) throw err;
                        res.status(200).send({ success: true });
                    })
                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(401).send(err);
    }
}

module.exports = PostJob