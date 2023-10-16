const connection = require("../db/connection");
const jwt = require("jsonwebtoken");

const verifyCaregivers = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { email } = verified;
        connection.query(`SELECT * FROM caregivers_ WHERE email = '${email}'`, (err) => {
            if (err) {
                res.status(401).send("Access Denied");
                throw err
            } else {
                next();
            }
        });
    } catch (err) {
        res.status(401).send("Access Denied");
    }
};

module.exports = verifyCaregivers;