const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function searchJobs(req, res) {
    const { speciality, pet, rate, experience, age, languages, addservices, rating } = req.body;

    try {
        const jobs = await prisma.jobs_.findMany({
            where: {
                speciality: speciality ? speciality : undefined,
                comfortableWithPets: pet ? pet : undefined,
                hourlyRate: {
                    gte: rate ? rate : undefined
                },
                experience: {
                    gte: experience ? experience : undefined
                },
                /* age: age, */
                language: {
                    contains: languages ? languages : undefined,
                },
                additionalService: {
                    contains: addservices ? addservices : undefined
                },
                rating: {
                    gte: rating ? parseFloat(rating) : undefined
                },
                status: "active"
            }
        });
    
        res.status(200).json(jobs);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");        
    }
}

module.exports = searchJobs;