const connection = require("../../db/connection");
const { validationResult } = require("express-validator");

function PaymentHistory(req, res) {
    const { email } = req.query;

    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.')
        } else {
            connection.query(`SELECT payment_history.* FROM payment_history INNER JOIN careseekers_ WHERE careseekers_.id = payment_history.careseekerId AND careseekers_.email = '${email}' ORDER BY payment_history.purchasedOn DESC`, (error, results) => {
                if (error) throw error;

                res.status(200).send(results);
            });
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = PaymentHistory;