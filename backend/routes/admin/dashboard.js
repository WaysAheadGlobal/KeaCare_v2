const connection = require('../../db/connection');

const dashboard = (req, res) => {
    let totalCaregivers = 0, totalCareseekers = 0, totalCaregiversVerified = 0, totalCaregiversUnverified = 0;

    connection.query('SELECT COUNT(*) AS totalCaregivers FROM caregivers_', (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving caregivers');
            throw err;
        }

        totalCaregivers = result[0].totalCaregivers;

        connection.query('SELECT COUNT(*) AS totalCareseekers FROM careseekers_', (err, result) => {
            if (err) {
                res.status(500).send('Error retrieving careseekers');
                throw err;
            }

            totalCareseekers = result[0].totalCareseekers;

            connection.query('SELECT COUNT(*) AS totalCaregivers FROM caregivers_ WHERE isVerified = TRUE', (err, result) => {
                if (err) {
                    res.status(500).send('Error retrieving caregivers');
                    throw err;
                }

                totalCaregiversVerified = result[0].totalCaregivers;

                connection.query('SELECT COUNT(*) AS totalCaregivers FROM caregivers_ WHERE isVerified = FALSE', (err, result) => {
                    if (err) {
                        res.status(500).send('Error retrieving caregivers');
                        throw err;
                    }

                    totalCaregiversUnverified = result[0].totalCaregivers;

                    res.status(200).json({
                        totalCaregivers,
                        totalCareseekers,
                        totalCaregiversVerified,
                        totalCaregiversUnverified
                    });
                });
            });
        });
    });
}

module.exports = dashboard;