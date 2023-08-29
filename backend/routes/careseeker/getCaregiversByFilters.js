const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function filters(req, res) {
    const { speciality, pet, rate, experience, daysAWeek, hrs, gender, age, languages, addservices, rating } = req.query;

    const caregivers = await prisma.caregivers_.findMany({
        where: {
            speciality: speciality || undefined,
            comfortableWithPets: pet ? !!pet : undefined,
            rate: {
                lte: rate ? parseFloat(rate) : undefined
            },
            experience: {
                gte: experience || undefined
            },
            daysAWeek: {
                gte: daysAWeek ? parseInt(daysAWeek) : undefined
            },
            workingHrs: {
                gte: hrs ? parseInt(hrs) : undefined
            },
            gender: gender || undefined,
            /* age: age, */
            languages: {
                contains: languages || undefined
            },
            task: {
                contains: addservices || undefined
            },
            rating: {
                gte: rating ? parseFloat(rating) : undefined
            }
        }
    });

    res.status(200).json(caregivers);
}

module.exports = filters;