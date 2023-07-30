const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");

const prisma = new PrismaClient();

async function jobs(req, res) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {
            const caregiver = await prisma.caregivers_.findUnique({
                where: {
                    email: req.query.email
                }
            });

            if (caregiver) {
                const jobs = await prisma.jobs_.findMany();
                res.status(200).json(jobs);
            } else {
                res.status(401).json({ "error": "Invalid Credentials" });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = jobs;