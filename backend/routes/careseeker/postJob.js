const { validationResult } = require('express-validator');
const { PrismaClient } = require("@prisma/client");
const dayjs = require('dayjs');

const prisma = new PrismaClient();

async function PostJob(req, res) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {
            const { email } = req.body;
            const careseeker = await prisma.careseekers_.findUnique({
                where: {
                    email: email
                }
            });

            if (careseeker) {
                const { additionalService, age, availability, comfortableWithPets, experience, hourlyRate, jobDateStart, jobDateEnd, jobDescription, language, location, rating, speciality, time } = req.body;

                const newJob = await prisma.jobs_.create({
                    data: {
                        userId: careseeker.id,
                        additionalService: additionalService,
                        age: age,
                        availability: parseInt(availability),
                        comfortableWithPets: comfortableWithPets,
                        experience: parseInt(experience),
                        hourlyRate: parseInt(hourlyRate),
                        jobDateStart: jobDateStart,
                        jobDateEnd: jobDateEnd,
                        jobDescription: jobDescription,
                        language: language,
                        location: location,
                        rating: parseFloat(rating),
                        speciality: speciality,
                        time: time,
                    }
                })
                res.status(200).json({ "success": true, ...newJob });
            } else {
                res.status(401).json({ "error": "Invalid Credentials" });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(401).send(err);
    }
}

module.exports = PostJob