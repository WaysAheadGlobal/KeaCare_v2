const { validationResult } = require("express-validator");
const connection = require("../../db/connection");

async function getSubscription(req, res) {
    const { email } = req.query;

    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.')
        } else {
            connection.query(`SELECT subscription.* FROM subscription INNER JOIN careseekers_ WHERE 
            careseekers_.id = subscription.careseekerId AND careseekers_.email = '${email}' ORDER BY subscription.purchasedOn DESC`, (error, results) => {
                if (error) throw error;

                res.status(200).send(results);
            });
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = getSubscription;