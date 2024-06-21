const connection = require('../../db/connection');

const getCaregiverById = (req, res) => {
    const { id } = req.query;
    const sql = `select *, r.url as reviewUrl, d.url as documentUrl, ce.url as certificateUrl FROM caregivers_ c INNER JOIN certificates ce INNER JOIN otherReviews r INNER JOIN documentProof d where c.id = ce.caregiverId AND c.id = r.caregiverId and c.id = d.caregiverId and c.id = ${id}`;
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