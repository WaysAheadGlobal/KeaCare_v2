const connection = require("../../db/connection");

const payment = (req, res) => {
    const { page } = req.query;

    const sql = `SELECT caregivers_.id, CONCAT(caregivers_.fname, ' ',caregivers_.lname) AS name, caregivers_.imageUrl, caregivers_.speciality, appointments_.totalPrice AS amount FROM caregivers_ INNER JOIN appointments_ WHERE caregiverId = caregivers_.id AND appointments_.status = 'Completed' ORDER BY id LIMIT 10 OFFSET ${((page ?? 1) - 1) * 10}`;

    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving payment");
            throw err;
        }
        res.status(200).send(result);
    });
}

module.exports = payment;