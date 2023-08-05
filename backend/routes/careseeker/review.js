const { validationResult } = require('express-validator');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function postReview(req, res) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {
            const { email, rating, review, caregiverId } = req.body;
            const careseeker = await prisma.careseekers_.findUnique({
                where: {
                    email: email,
                }
            });

            if (careseeker) {
                const _review = await prisma.reviews.create({
                    data: {
                        fname: careseeker.fname,
                        lname: careseeker.lname,
                        careseekerId: careseeker.id,
                        careseekerImageUrl: careseeker.imageUrl,
                        review: review,
                        rating: rating,
                        caregiverId: parseInt(caregiverId)
                    }
                })
                res.status(200).json({ success: true });
            }
            else {
                res.status(401).send({ "error": "Invalid Credentials" });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function getReviews(req, res) {
    const { caregiverId, email } = req.query;

    const careseeker = await prisma.careseekers_.findUnique({
        where: {
            email: email,
        }
    });

    if (caregiverId) {
        const reviews = await prisma.reviews.findMany({
            where: {
                caregiverId: parseInt(caregiverId)
            }
        });

        res.status(200).json({
            userReview: {
                ...reviews.filter(review => review.careseekerId === careseeker.id)[0]
            },
            otherReviews: reviews.filter(review => review.careseekerId !== careseeker.id)
        });
    } else {
        res.status(401).send({ "error": "Invalid Credentials" });
    }
}

async function updateReview(req, res) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {
            const { email, rating, review, caregiverId } = req.body;
            const careseeker = await prisma.careseekers_.findUnique({
                where: {
                    email: email,
                }
            });

            if (careseeker) {
                const _review = await prisma.reviews.updateMany({
                    where: {
                        careseekerId: careseeker.id,
                        caregiverId: parseInt(caregiverId)
                    },
                    data: {
                        review: review,
                        rating: rating,
                    }
                })
                res.status(200).json({ success: true });
            }
            else {
                res.status(401).send({ "error": "Invalid Credentials" });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { postReview, getReviews, updateReview };