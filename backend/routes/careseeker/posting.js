const { validationResult } = require("express-validator")
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function postings(req, res) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {
            const { email } = req.query;
            const caregiver = await prisma.careseekers_.findUnique({
                where: {
                    email: email
                }
            });

            if (caregiver) {
                const jobs = await prisma.jobs_.findMany({
                    where: {
                        userId: caregiver.id
                    }
                });

                res.status(200).json(jobs);
            } else {
                res.status(401).send({ "error": "Invalid Credentials" });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(401).send(err);
    }
}

module.exports = postings;