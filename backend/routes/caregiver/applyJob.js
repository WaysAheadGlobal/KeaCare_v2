const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");

const prisma = new PrismaClient();

async function applyJob(req, res) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {
            const caregiver = await prisma.caregivers_.findUnique({
                where: {
                    email: req.body.email
                }
            });
            if (caregiver) {
                const job = await prisma.jobs_.findUnique({
                    where: {
                        id: req.body.jobId,
                        status: "active"
                    }
                });

                const applicant = await prisma.applicants.findFirst({
                    where: {
                        jobId: job.id,
                        applicantId: caregiver.id
                    }
                });

                if (!applicant) {
                    const job = await prisma.jobs_.update({
                        where: {
                            id: req.body.jobId,
                            status: "active"
                        },
                        data: {
                            responses: {
                                increment: 1
                            }
                        }
                    });
                    const application = await prisma.applicants.create({
                        data: {
                            userId: job.userId,
                            jobId: job.id,
                            applicantId: caregiver.id
                        }
                    });

                    res.status(200).json(job ? { job, application } : {});
                } else {
                    res.status(401).send({ "error": "You cannot apply for a job more than once." })
                }
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

module.exports = applyJob;