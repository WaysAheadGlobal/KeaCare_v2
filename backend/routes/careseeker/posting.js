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
            const careseeker = await prisma.careseekers_.findUnique({
                where: {
                    email: email
                }
            });

            if (careseeker) {
                const jobs = await prisma.jobs_.findMany({
                    where: {
                        userId: careseeker.id
                    },
                    orderBy: {
                        createdOn: "desc"
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