const connection = require("../../db/connection");

const verifyCaregivers = (req, res) => {
    const {id, action} = req.query;
    const sql = `UPDATE caregivers_ SET isVerified = ${action === "verify" ? 'TRUE' : 'FALSE'} WHERE id = ${id}`;
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Error verifying caregiver");
            throw err;
        }
        res.status(200).send("Caregiver verified");
    });
}

module.exports = verifyCaregivers;