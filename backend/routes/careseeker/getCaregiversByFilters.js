const connection = require("../../db/connection");

async function filters(req, res) {
    const { speciality, pet, rateStart, rateEnd, experience, daysAWeek, hrs, gender, age, languages, addservices, rating, page } = req.query;

    let sqlQuery = `
        SELECT c.id, c.fname, c.lname, c.gender, c.status, c.imageUrl, c.rating, c.languages, c.speciality, c.experience, 
        c.isVerified, c.task, c.comfortableWithPets, c.rate, c.daysAWeek, c.workingHrs, c.bio, c.distance, c.age, c.reviews
        FROM caregivers_ as c 
        ${(speciality || pet || rateStart || rateEnd || experience || languages || addservices || rating || daysAWeek || hrs || gender || age) ? 'WHERE' : ''}
        ${speciality ? `speciality = '${speciality}'` : ''}
        ${speciality && (pet || rateStart || rateEnd || experience || languages || addservices || rating || daysAWeek || hrs || gender || age) ? ' AND ' : ''}
        ${pet ? `comfortableWithPets = 1` : ''}
        ${pet && (rateStart || rateEnd || experience || languages || addservices || rating || daysAWeek || hrs || gender || age) ? ' AND ' : ''}
        ${rateStart ? `rate >= ${rateStart}` : ""}
        ${rateStart && (rateEnd || experience || languages || addservices || rating || daysAWeek || hrs || gender || age) ? ' AND ' : ''}
        ${rateEnd ? `rate <= ${rateEnd}` : ""}
        ${rateEnd && (experience || languages || addservices || rating || daysAWeek || hrs || gender || age) ? ' AND ' : ''}
        ${experience ? `experience >= ${experience}` : ""}
        ${experience && (languages || addservices || rating || daysAWeek || hrs || gender || age) ? ' AND ' : ''}
        ${languages.length !== 0 ? languages?.split(",").map((language, index) => `LOCATE('${language}', languages) != 0 ${languages.split(",")[index + 1] && (addservices || rating || daysAWeek || hrs || gender || age) ? ' AND ' : ''}`).toString().replaceAll("AND ,", "AND ").replaceAll(",L", "AND L") : ""
        }
        ${languages && (addservices || rating || daysAWeek || hrs || gender || age) ? ' AND ' : ''}
        ${addservices.length !== 0 ? addservices?.split(",").map((service, index) => `LOCATE('${service}', task) != 0 ${addservices.split(",")[index + 1] && (rating || daysAWeek || hrs || gender || age) ? ' AND ' : ''}`).toString().replaceAll("AND ,", "AND ").replaceAll(",L", "AND L") : ""
        }
        ${addservices && (rating || daysAWeek || hrs || gender || age) ? ' AND ' : ''}
        ${rating ? `rating >= ${rating}` : ""}
        ${rating && (daysAWeek || hrs || gender || age) ? ' AND ' : ''}
        ${daysAWeek.length !== 0 ? daysAWeek?.split(",").map((day, index) => `LOCATE('${day}', daysAWeek) != 0 ${daysAWeek.split(",")[index + 1] && (hrs || gender || age) ? ' AND ' : ''}`).toString().replaceAll("AND ,", "AND ").replaceAll(",L", "AND L") : ""
        }
        ${daysAWeek && (hrs || gender || age) ? ' AND ' : ''}
        ${hrs.length !== 0 ? hrs?.split(",").map((hr, index) => `LOCATE('${hr}', workingHrs) != 0 ${hrs.split(",")[index + 1] && (gender || age) ? ' AND ' : ''}`).toString().replaceAll("AND ,", "AND ").replaceAll(",L", "AND L") : ""
        }
        ${hrs && (gender || age) ? ' AND ' : ''}
        ${gender ? `gender = '${gender}'` : ""}
        ${gender && age ? ' AND ' : ''}
        ${age ? `age >= ${age.split("-")[0]} AND age <= ${age.split("-")[1]}` : ""}
        AND isVerified = TRUE ORDER BY id LIMIT 10 OFFSET ${((page ?? 1) - 1) * 10}
    `;

    connection.query(sqlQuery, (error, results) => {
        if (error) throw error;

        res.status(200).send(results);
    });
}

module.exports = filters;