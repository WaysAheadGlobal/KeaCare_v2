const connection = require("../../db/connection");

const getAppointmentDetails = (req, res) => {
    const { appointmentId } = req.body;

    const query = `SELECT appointments_.*, CONCAT(careseekers_.fname, ' ', careseekers_.lname) AS careseekerName, careseekers_.imageUrl as careseekerImage,careseekers_.address, careseekers_.city, careseekers_.province, careseekers_.zipcode FROM appointments_ INNER JOIN careseekers_ WHERE appointments_.careseekerId = careseekers_.id AND appointments_.id = ?;`;

    connection.query(query, [appointmentId], (err, result) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Server error. Please try again.",
            });
        } else if (result.length === 0) {
            res.status(404).json({
                success: false,
                message: "Appointment not found.",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Appointment found.",
                data: result[0],
            });
        }
    });
}

module.exports = getAppointmentDetails;
