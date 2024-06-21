const connection = require("../../db/connection");

const getAllAppointments = (req, res) => {
    const { id } = req.body;
    const sql = `SELECT appointments_.*, CONCAT(careseekers_.fname, ' ', careseekers_.lname) AS careseekerName, careseekers_.imageUrl as careseekerImage FROM appointments_ INNER JOIN careseekers_ WHERE caregiverId = ${id} AND appointments_.careseekerId = careseekers_.id;`;
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Internal Server error");
            throw err;
        };
        res.status(200).json(result);
    });
};

module.exports = getAllAppointments;