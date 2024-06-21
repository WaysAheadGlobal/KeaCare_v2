const connection = require('../../db/connection');

const getAllChatsBySenderIdAndReceiverId = (req, res) => {
    const { receiverId } = req.params;
    const sql = `SELECT * FROM chats WHERE senderId = ? AND receiverId = ?`;
    connection.query(sql, [req.body.id, Number(receiverId)], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
}

const getLastChatBySenderIdAndReceiverId = (req, res) => {
    const { receiverId } = req.params;
    const sql = `SELECT * FROM chats WHERE senderId = ? AND receiverId = ? ORDER BY created_on DESC LIMIT 1`;
    connection.query(sql, [req.body.id, Number(receiverId)], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
}

const addChat = (req, res) => {
    const { id, receiverId, message, role } = req.body;
    const sql = `INSERT INTO chats (senderId, receiverId, message, senderType, receiverType, modified_on) VALUES (?, ?, ?, ?, ?, NOW())`;
    connection.query(sql, [id, Number(receiverId), message, role, role === "careseeker" ? "caregiver" : "careseeker"], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
            throw err;
        } else {
            res.status(200).json({ message: 'Chat added successfully' });
        }
    });
}

module.exports = {
    getAllChatsBySenderIdAndReceiverId,
    getLastChatBySenderIdAndReceiverId,
    addChat
};