const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getApplicantsById(req, res) {
    const { jobId } = req.query;

    try {
        if (jobId) {
            const applicants = await prisma.applicants.findMany({
                where: {
                    jobId: parseInt(jobId)
                }
            });

            res.status(200).json(applicants);
        } else {
            res.status(401).send("Invalid Credentials");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = getApplicantsById;