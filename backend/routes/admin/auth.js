const connection = require("../../db/connection");
const jwt = require("jsonwebtoken");
const { hashSync, compareSync } = require("bcryptjs");

const signup = (req, res) => {
    const { name, email, password } = req.body;
    connection.query(`SELECT * FROM admin_kc WHERE email = '${email}'`, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.status(409).send("Email already exists");
        } else {
            const encryptedPassword = hashSync(password, 10);
            connection.query(`INSERT INTO admin_kc (name, email, password, updated_at) VALUES ('${name}' ,'${email}', '${encryptedPassword}', NOW())`, (err) => {
                if (err) throw err;
                const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
                    algorithm: "HS512"
                });
                res.status(201).json({ token });
            }
            );
        }
    });
}

const login = (req, res) => {
    const { email, password } = req.body;
    connection.query(`SELECT * FROM admin_kc WHERE email = '${email}'`, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const isPasswordValid = compareSync(password, result[0].password);
            if (isPasswordValid) {
                const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
                    algorithm: "HS512"
                });
                res.status(200).json({ token });
            } else {
                res.status(401).send("Invalid password");
            }
        } else {
            res.status(401).send("Invalid email");
        }
    });
}

const verifyToken = (req, res) => {
    res.status(200).send({ success: true });
}

module.exports = {
    signup,
    login,
    verifyToken
};