const { validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const { sendOTP } = require("../../mail/MailService.js");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

async function SignupOTP(req, res) {
    const errors = validationResult(req);
    try {
        const otp = parseInt(Math.random() * 1000000);
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.')
        } else {
            const caregiver = await prisma.caregivers_.findUnique({
                where: {
                    email: req.body.email
                }
            })
            if (caregiver) {
                res.status(402).json({ error: "User already exists. Please try logging in." });
            } else {
                await sendOTP(req.body.email, otp, "Sign up");
                res.status(200).json({ "otp": otp });
            }
        }
    } catch (err) {
        console.error(err);
    }
}

async function Signup(req, res) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {
            const { email, token } = req.body;
            try {
                const caregiver = await prisma.caregivers_.findUnique({
                    where: {
                        email: req.body.email
                    }
                })
                if (caregiver) {
                    res.status(402).json({ error: "User already exists. Please try logging in." });
                } else {
                    const user = await prisma.caregivers_.create({
                        data: {
                            email: email,
                            token: token
                        }
                    });
                    const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
                        algorithm: "HS512"
                    });
                    res.status(200).json({
                        "success": true,
                        ...user,
                        jwtToken
                    });
                }
            } catch (error) {
                console.log(err);
                res.status(403).send(err);
            }
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = { SignupOTP, Signup };