const { Router } = require("express");
const { validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const { sendOTP } = require("../../mail/MailService.js");
const jwt = require("jsonwebtoken");
const connection = require("../../db/connection.js");
const { sendOTPtoPhoneNumber, verifyOTP } = require("../../twilio/OTPService.js");

const caregiverLoginRouter = Router();
const prisma = new PrismaClient();

async function LoginOTP(req, res) {
    const errors = validationResult(req);
    try {
        if (req.body.phoneNo) {
            const user = await prisma.caregivers_.findFirst({
                where: {
                    mobile: req.body.phoneNo
                }
            });

            if (!user) {
                res.status(403).json({ "error": "User not found. Please sign up or try with a different phone number" });
                return;
            }

            await sendOTPtoPhoneNumber({ countryCode: req.body.countryCode, phoneNumber: req.body.phoneNo });
            res.status(200).json({ "success": true });
            return;
        }
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {
            const otp = parseInt(Math.random() * 1000000);
            const { email } = req.body;

            const user = await prisma.caregivers_.findFirst({
                where: {
                    email: email
                }
            });


            if (user) {
                await prisma.caregivers_.update({
                    where: {
                        email: email
                    },
                    data: {
                        token: otp.toString()
                    }
                });
                sendOTP(email, otp, "Log in");
                res.status(200).json({ "otp": otp });
            } else {
                res.status(403).json({ "error": "User not found. Please sign up or try with a different email address" })
            }
        }
    } catch (err) {
        console.error(err);
    }
}

async function Login(req, res) {
    const errors = validationResult(req);
    try {
        if (req.body.phoneNo) {
            const user = await prisma.caregivers_.findFirst({
                where: {
                    mobile: req.body.phoneNo
                }
            });
            if (!user) {
                res.status(403).json({ "error": "User not found. Please sign up or try with a different phone number" });
                return;
            }
            const verificationResponse = await verifyOTP({ countryCode: req.body.countryCode, phoneNumber: req.body.phoneNo, otp: req.body.token });
            if (verificationResponse.status === "approved") {
                const jwtToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, {
                    algorithm: "HS512"
                });
                res.status(200).json({
                    "success": true,
                    ...user,
                    jwtToken
                });
            } else {
                res.status(403).json({
                    "error": "Invalid OTP"
                });
            }
            return;
        }
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {
            const { email, token } = req.body;

            const user = await prisma.caregivers_.findFirst({
                where: {
                    email: email
                }
            });

            if (!user) {
                res.status(403).json({ "error": "User not found. Please sign up or try with a different email address" });
            } else {
                if (user.token === token) {
                    const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
                        algorithm: "HS512"
                    });
                    res.status(200).json({
                        "success": true,
                        ...user,
                        jwtToken
                    });
                } else {
                    res.status(403).json({
                        "error": "Invalid OTP"
                    });
                }
            }
        }
    } catch (err) {
        console.error(err);
    }
}

const googleLoginCaregiver = (req, res) => {
    const { token } = req.body;
    const credentials = jwt.decode(token);
    const email = credentials.email;
    connection.query(`SELECT * FROM caregivers_ WHERE email = '${email}'`, (err, result) => {
        if (err) {
            res.status(500).json({ "error": "Internal server error" });
            throw err;
        } else if (result.length === 0) {

            res.status(403).json({ "error": "User not found. Please sign up or try with a different email address" });
        } else {
            const user = prisma.caregivers_.findFirst({
                where: {
                    email: email
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
    });
}

module.exports = { caregiverLoginRouter, LoginOTP, Login, googleLoginCaregiver };
