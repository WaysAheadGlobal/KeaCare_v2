const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getCareseekerInfo(req, res) {
    const { email } = req.query;

    if (email) {
        const careseeker = await prisma.careseekers_.findUnique({
            where: {
                email: email
            }
        });
        res.status(200).json(careseeker);
    } else {
        res.status(401).json({ "error": "Invalid Credentials" });
    }
}

module.exports = getCareseekerInfo;