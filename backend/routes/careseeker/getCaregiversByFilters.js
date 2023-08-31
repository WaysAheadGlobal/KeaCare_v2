const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function filters(req, res) {
    const { speciality, pet, rateStart, rateEnd, experience, daysAWeek, hrs, gender, age, languages, addservices, rating } = req.query;

    let rate = {};

    if (rateStart) {
        rate = {
            ...rate,
            gte: parseFloat(rateStart)
        };
    } 
    if (rateEnd) {
        rate = {
            ...rate,
            lte: parseFloat(rateEnd)
        };
    }

    const caregivers = await prisma.caregivers_.findMany({
        where: {
            speciality: speciality || undefined,
            comfortableWithPets: pet ? !!pet : undefined,
            rate: {
                ...rate                
            },
            experience: {
                gte: experience ? parseFloat(experience) : undefined
            },
            daysAWeek: {
                contains: daysAWeek || undefined
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