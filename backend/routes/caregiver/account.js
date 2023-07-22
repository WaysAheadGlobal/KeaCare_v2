const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getCaregiverInfo(req, res) {
    const { email } = req.query;

    if (email) {
        const caregiver = await prisma.caregivers_.findUnique({
            where: {
                email: email
            }
        });
        res.status(200).json(caregiver);
    } else {
        res.status(401).json({ "error": "Invalid Credentials" });
    }
}

module.exports = getCaregiverInfo;