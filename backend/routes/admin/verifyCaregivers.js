const connection = require("../../db/connection");
const { sendAccountVerificationCompletedMail } = require("../../mail/MailService");

const verifyCaregivers = (req, res) => {
    const { id, action } = req.query;
    const sql = `UPDATE caregivers_ SET isVerified = ${action === "verify" ? 'TRUE' : 'FALSE'} WHERE id = ${id}`;
    if (action === "verify") {
        connection.query(`SELECT email, CONCAT(fname, ' ', lname) as name FROM caregivers_ WHERE id = ${id}`, (err, result) => {
            if (err) {
                res.status(500).send("Error selecting caregiver");
                throw err;
            }
            sendAccountVerificationCompletedMail(result[0].name, result[0].email);
        });
    }
    connection.query(sql, (err) => {
        if (err) {
            res.status(500).send("Error verifying caregiver");
            throw err;
        }
        res.status(200).send("Caregiver verified");
    });
}

module.exports = verifyCaregivers;