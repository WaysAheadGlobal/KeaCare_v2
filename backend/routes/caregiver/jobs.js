const { validationResult } = require("express-validator");
const connection = require("../../db/connection");

async function jobs(req, res) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {
            connection.query(`SELECT id FROM caregivers_ WHERE email='${req.query.email}'`, (error, results) => {
                if (error) throw error;

                if (results[0]) {
                    connection.query(`SELECT DISTINCT jobs_.*, careseekers_.imageUrl, careseekers_.fname, careseekers_.lname FROM jobs_ INNER JOIN careseekers_, applicants WHERE jobs_.userId = careseekers_.id AND jobs_.status = 'active' 
                    AND applicants.applicantId != ${req.body.id} AND jobs_.id != applicants.jobId;`, (err, results_) => {
                        if (err) throw err;

                        res.status(200).json(results_);
                    })
                } else {
                    res.status(401).json({ "error": "Invalid Credentials" });
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = jobs;