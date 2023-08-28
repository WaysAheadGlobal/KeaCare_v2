const connection = require("../../db/connection");
const { validationResult } = require("express-validator");

function addFavourites(req, res) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {
            const { caregiverId, careseekerEmail } = req.body;

            connection.query(`SELECT id FROM careseekers_ WHERE email = '${careseekerEmail}'`, (error, results) => {
                if (error) throw error;

                connection.query(`INSERT INTO favourites (careseekerId, caregiverId) VALUES (${results[0].id}, ${caregiverId})`, (err) => {
                    if (err) throw err;

                    res.status(200).json({ success: true });
                });
            });

        }

    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false });
    }
}

function getFavourites(req, res) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {

            const { careseekerEmail } = req.query;

            connection.query(`SELECT id FROM careseekers_ WHERE email = '${careseekerEmail}'`, (error, results) => {
                if (error) throw error;

                if (results.length === 0) {
                    res.status(402).send("Invalid Credentials");
                } else {
                    connection.query(`SELECT favourites.*, caregivers_.id, caregivers_.fname, caregivers_.lname, caregivers_.imageUrl, caregivers_.rating, caregivers_.rate, caregivers_.workingHrs, caregivers_.daysAWeek, caregivers_.languages, caregivers_.speciality, caregivers_.experience, caregivers_.comfortableWithPets, caregivers_.task, caregivers_.distance FROM favourites INNER JOIN caregivers_ WHERE caregivers_.id = favourites.caregiverId AND careseekerId = ${results[0].id}`, (err, results_) => {
                        if (err) throw err;

                        res.status(200).json(results_);
                    });
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
}

function getFavouriteByCareseekerAndCaregiverId(req, res) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {

            const { careseekerEmail, caregiverId } = req.query;

            connection.query(`SELECT id FROM careseekers_ WHERE email = '${careseekerEmail}'`, (error, results) => {
                if (error) throw error;

                connection.query(`SELECT * FROM favourites WHERE careseekerId = ${results[0].id} AND caregiverId = ${caregiverId}`, (err, results_) => {
                    if (err) throw err;

                    res.status(200).json(results_);
                });
            });
        }
    } catch (error) {
        console.log(error);
    }
}

function removeFromFavourites(req, res) {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {
            const { caregiverId, careseekerEmail } = req.body;

            connection.query(`SELECT id FROM careseekers_ WHERE email = '${careseekerEmail}'`, (error, results) => {
                if (error) throw error;

                connection.query(`DELETE FROM favourites WHERE careseekerId = ${results[0].id} AND caregiverId = ${caregiverId}`, (err) => {
                    if (err) throw err;

                    res.status(200).json({ success: true });
                });
            });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { addFavourites, getFavourites, removeFromFavourites, getFavouriteByCareseekerAndCaregiverId };