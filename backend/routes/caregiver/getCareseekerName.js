const connection = require("../../db/connection");

const getCareseekerNameById = (req, res) => {
    connection.query("SELECT CONCAT(fname, ' ', lname) as name, imageUrl, id FROM careseekers_ WHERE id = ?", [req.params.id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error",
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({
                    message: "Careseeker not found",
                });
            } else {
                res.status(200).json({
                    message: "Careseeker found",
                    ...result[0],
                });
            }
        }
    });
};

module.exports = getCareseekerNameById;