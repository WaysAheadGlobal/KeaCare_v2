const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const connection = require("../../db/connection");

async function searchJobs(req, res) {
    const { speciality, pet, rate, experience, age, languages, addservices, rating } = req.body;

    connection.query(`
        SELECT jobs_.*, careseekers_.imageUrl, careseekers_.fname, careseekers_.lname FROM jobs_ INNER JOIN careseekers_ WHERE 
        ${speciality ? `jobs_.speciality = '${speciality} AND '` : ''} 
        ${pet ? `jobs_.comfortableWithPets = 1 AND ` : ''} 
        ${rate ? `jobs_.hourlyRate <= ${rate} AND ` : ''}
        ${age ? `jobs_.age <= ${age} AND ` : ''}
        ${experience ? `jobs_.experience >= ${experience} AND ` : ''}
        ${languages ? `LOCATE('${languages}', jobs_.language) != 0 AND ` : ''}
        ${addservices ? `LOCATE('${addservices}', jobs_.additionalService) != 0 AND ` : ''}
        ${rating ? `jobs_.rating >= ${rating}` : ''}
        AND careseekers_.id = jobs_.userId
        AND jobs_.status = 'active'
    `, (error, results) => {
        if (error) throw error;

        res.status(200).json(results);
    })

    /* try {
        const jobs = await prisma.jobs_.findMany({
            where: {
                speciality: speciality ? speciality : undefined,
                comfortableWithPets: pet ? pet : undefined,
                hourlyRate: {
                    lte: rate ? rate : undefined
                },
                experience: {
                    gte: experience ? experience : undefined
                },
                age: age,
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
    } */
}

module.exports = searchJobs;