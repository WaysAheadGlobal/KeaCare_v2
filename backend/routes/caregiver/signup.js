const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const { sendOTP } = require("../../mail/MailService.js");

const caregiverSignupRouter = Router();
const prisma = new PrismaClient();

async function SignupOTP(req, res) {
    const errors = validationResult(req);
    try {
        const otp = parseInt(Math.random() * 1000000);
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.')
        } else {
            await sendOTP(req.body.email, otp, "Signing up");
            res.status(200).json({ "otp": otp });
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
                const user = await prisma.caregivers_.create({
                    data: {
                        email: email,
                        token: token
                    }
                });
                res.status(200).json({
                    "success": true,
                    ...user
                });
            } catch ({ meta: { target } }) {
                if (target === "email") {
                    res.status(403).json({ "error": "Email already in use." });
                }
            }
        }
    } catch (err) {
        console.error(err);
    }
}

caregiverSignupRouter.get("/all", async (req, res) => {
    const careseekers = await prisma.caregivers_.findMany();
    res.status(200).json(careseekers);
})

module.exports = { caregiverSignupRouter, SignupOTP, Signup };