const { validationResult } = require('express-validator');
const connection = require("../../db/connection");

function postReview(req, res) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {
            const { email, rating, review, caregiverId } = req.body;

            connection.query(`SELECT id FROM careseekers_ WHERE email = '${email}'`, (error, results) => {
                if (error) throw error;

                if (results.length === 0) {
                    res.status(401).send("Invalid Credentials");
                } else {
                    const careseeker = results[0];

                    connection.query(`INSERT INTO reviews (careseekerId, caregiverId, review, rating) VALUES (${careseeker.id}, ${caregiverId}, '${review}', ${rating})`, (err, results_) => {
                        if (err) throw err;

                        connection.query(`SELECT AVG(reviews.rating) AS rating FROM reviews WHERE caregiverId = ${caregiverId}`, (error, results__) => {
                            if (error) throw error;

                            const avg = results__[0].rating;
                            connection.query(`UPDATE caregivers_ SET rating = ${avg} WHERE id = ${caregiverId}`, (e) => {
                                if (e) throw e;
                            })
                        });
                        res.status(200).send({ success: true });
                    });
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function getReviews(req, res) {
    const { caregiverId, email } = req.query;

    connection.query(`SELECT id FROM careseekers_ WHERE email = '${email}'`, (error, results) => {
        if (error) throw error;

        if (results.length === 0) {
            res.status(401).send("Invalid Credentials");
        } else {
            const careseeker = results[0];

            connection.query(`SELECT careseekers_.fname, careseekers_.lname, careseekers_.imageUrl, reviews.* FROM reviews INNER JOIN careseekers_ WHERE reviews.caregiverId = ${caregiverId} AND careseekers_.id = reviews.careseekerId`, (err, results_) => {
                if (err) throw err;
                res.status(200).json({
                    userReview: {
                        ...results_.filter(review => review.careseekerId === careseeker.id)[0]
                    },
                    otherReviews: results_.filter(review => review.careseekerId !== careseeker.id)
                });
            });
        }
    });
}

async function updateReview(req, res) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {
            const { email, rating, review, caregiverId } = req.body;

            connection.query(`SELECT id FROM careseekers_ WHERE email = '${email}'`, (error, results) => {
                if (error) throw error;

                if (results.length === 0) {
                    res.status(401).send("Invalid Credentials");
                } else {
                    const careseeker = results[0];

                    connection.query(`UPDATE reviews SET review = '${review}', rating = '${rating}' WHERE careseekerId = ${careseeker.id} AND caregiverId = ${caregiverId}`, (err, results_) => {
                        if (err) throw err;

                        connection.query(`SELECT AVG(reviews.rating) AS rating FROM reviews WHERE caregiverId = ${caregiverId}`, (error, results__) => {
                            if (error) throw error;

                            const avg = results__[0].rating;
                            connection.query(`UPDATE caregivers_ SET rating = ${avg} WHERE id = ${caregiverId}`, (e) => {
                                if (e) throw e;
                            })
                        });
                        res.status(200).json({ success: true });
                    });
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { postReview, getReviews, updateReview };