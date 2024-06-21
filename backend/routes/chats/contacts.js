const connection = require('../../db/connection');

const getContacts = (req, res) => {
    let sql;
    if (req.body.role === 'careseeker') {
        sql = `SELECT contacts.*, fname, lname, imageUrl, caregivers_.id as caregiverId FROM contacts INNER JOIN caregivers_ WHERE receiverId = caregivers_.id AND senderId = ${req.body.id} AND senderType = '${req.body.role}' ORDER BY modified_on DESC;`;

    } else {
        sql = `SELECT contacts.*, fname, lname, imageUrl, careseekers_.id as careseekerId FROM contacts INNER JOIN careseekers_ WHERE senderId = careseekers_.id AND receiverId = ${req.body.id} AND receiverType = '${req.body.role}' ORDER BY modified_on DESC;`;
    }

    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
            throw err;
        } else {
            res.status(200).json(results);
        }
    });
}

const addContact = (req, res) => {
    const { receiverId } = req.body;
    connection.query(`SELECT * FROM contacts WHERE senderId = ${req.body.id} AND senderType = '${req.body.role}' AND receiverId = ${receiverId} AND receiverType = '${req.body.role === "careseeker" ? "caregiver" : "careseeker"}'`, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
            throw err;
        } else if (results.length > 0) {
            res.status(200).json({ success: true, message: 'Contact already exists' });
        } else {
            const sql = `INSERT INTO contacts(senderId, senderType, receiverId, receiverType, modified_on) VALUES(${req.body.id}, '${req.body.role}', ${receiverId}, '${req.body.role === "careseeker" ? "caregiver" : "careseeker"}', NOW())`;
            connection.query(sql, (err) => {
                if (err) {
                    res.status(500).json({ message: 'Internal server error' });
                    throw err;
                } else {
                    res.status(200).json({ success: true, message: 'Contact added successfully' });
                }
            });
        }
    });
}

module.exports = {
    getContacts,
    addContact
};