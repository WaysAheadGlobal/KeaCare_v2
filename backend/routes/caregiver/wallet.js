const connection = require("../../db/connection");
const { validationResult } = require("express-validator")

function wallet(req, res) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {
            const { email } = req.query;

            connection.query(`SELECT a.*, CONCAT(c1.fname, ' ', c1.lname) AS careseekername FROM appointments_ a INNER JOIN caregivers_ c, careseekers_ c1 WHERE a.caregiverId = c.id AND c.email = '${email}' AND c1.id = a.careseekerId`, (err, results) => {
                if (err) throw err;

                res.status(200).send(results);
            })
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = wallet;