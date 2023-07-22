const { Router } = require("express");
const { validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const { sendOTP } = require("../../mail/MailService.js");

const caregiverLoginRouter = Router();
const prisma = new PrismaClient();

async function LoginOTP(req, res) {
    const errors = validationResult(req);
    try {
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
                sendOTP(email, otp, "Logging in");
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
                    res.status(200).json({
                        "success": true,
                        ...user
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

module.exports = {caregiverLoginRouter, LoginOTP, Login};
