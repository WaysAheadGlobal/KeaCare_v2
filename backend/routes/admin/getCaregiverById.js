const connection = require('../../db/connection');

const getCaregiverById = (req, res) => {
    const { id } = req.query;
    const sql = `SELECT * FROM caregivers_ WHERE id = ${id}`;
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(400).send('Error in caregiver by id');
            throw err;
        } else {
            res.status(200).json(results[0]);
        }
    });
};

module.exports = getCaregiverById;