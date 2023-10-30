const connection = require("../db/connection");
const jwt = require("jsonwebtoken");

const verifyCaregivers = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { email } = verified;
        connection.query(`SELECT * FROM caregivers_ WHERE email = '${email}'`, (err, results) => {
            if (err) {
                res.status(401).send("Access Denied");
                throw err;
            } else {
                if (!req.body) {
                    next();
                }
                req.body.email = email;
                req.query.email = email;
                req.body.caregiverEmail = email;
                req.query.caregiverEmail = email;
                req.body.role = "caregiver";
                req.body.id = results[0].id;
                next();
            }
        });
    } catch (err) {
        res.status(401).send("Access Denied");
    }
};

module.exports = verifyCaregivers;