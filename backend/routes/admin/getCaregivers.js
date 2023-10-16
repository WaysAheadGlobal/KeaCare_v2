const connection = require("../../db/connection");

const getCaregivers = (req, res) => {
    const { page } = req.query;

    const sql = `SELECT * FROM caregivers_ WHERE status != 'incomplete' AND isVerified = FALSE ORDER BY id LIMIT 10 OFFSET ${((page ?? 1) - 1) * 10}`;

    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving caregivers from database");
            throw err;
        }
        res.status(200).json(result);
    });
};

module.exports = getCaregivers;