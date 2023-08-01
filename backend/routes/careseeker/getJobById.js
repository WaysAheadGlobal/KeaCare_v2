const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getJobById(req, res) {
    const { id } = req.query;

    try {
        if (id) {
            const job = await prisma.jobs_.findUnique({
                where: {
                    id: parseInt(id)
                }
            });

            res.status(200).json(job);
        } else {
            res.status(401).send("Invalid Credentials");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = getJobById;