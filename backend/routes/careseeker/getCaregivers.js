const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getCaregivers(req, res) {
    const { page } = req.query;

    const caregivers = await prisma.caregivers_.findMany({
        orderBy: {
            id: "asc"
        },
        skip: 10 * (parseInt(page) - 1),
        take: 10
    });

    res.status(200).json(caregivers);
}

module.exports = getCaregivers;