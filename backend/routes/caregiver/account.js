const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getCaregiverInfo(req, res) {
    const { id } = req.query;

    if (id) {
        const caregiver = await prisma.caregivers_.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        res.status(200).json(caregiver);
    } else {
        res.status(401).json({ "error": "Invalid Credentials" });
    }
}

module.exports = getCaregiverInfo;