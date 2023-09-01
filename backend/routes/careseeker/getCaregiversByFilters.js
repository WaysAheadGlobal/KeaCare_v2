const connection = require("../../db/connection");

async function filters(req, res) {
    const { speciality, pet, rateStart, rateEnd, experience, daysAWeek, hrs, gender, age, languages, addservices, rating } = req.query;

    let sqlQuery = `
        SELECT * FROM caregivers_ 
        ${(speciality || pet || rateStart || rateEnd || experience || languages || addservices || rating || daysAWeek || hrs || gender) ? 'WHERE' : ''}
        ${speciality ? `speciality = '${speciality}'` : ''}
        ${speciality && (pet || rateStart || rateEnd || experience || languages || addservices || rating || daysAWeek || hrs || gender) ? ' AND ' : ''}
        ${pet ? `comfortableWithPets = 1` : ''}
        ${pet && (rateStart || rateEnd || experience || languages || addservices || rating || daysAWeek || hrs || gender) ? ' AND ' : ''}
        ${rateStart ? `rate >= ${rateStart}` : ""}
        ${rateStart && (rateEnd || experience || languages || addservices || rating || daysAWeek || hrs || gender) ? ' AND ' : ''}
        ${rateEnd ? `rate <= ${rateEnd}` : ""}
        ${rateEnd && (experience || languages || addservices || rating || daysAWeek || hrs || gender) ? ' AND ' : ''}
        ${experience ? `experience >= ${experience}` : ""}
        ${experience && (languages || addservices || rating || daysAWeek || hrs || gender) ? ' AND ' : ''}
        ${languages.length !== 0 ? languages?.split(",").map((language, index) => `LOCATE('${language}', languages) != 0 ${languages.split(",")[index + 1] && (addservices || rating || daysAWeek || hrs || gender) ? ' AND ' : ''}`).toString().replaceAll("AND ,", "AND ").replaceAll(",L", "AND L") : ""
        }
        ${languages && (addservices || rating || daysAWeek || hrs || gender) ? ' AND ' : ''}
        ${addservices.length !== 0 ? addservices?.split(",").map((service, index) => `LOCATE('${service}', task) != 0 ${addservices.split(",")[index + 1] && (rating || daysAWeek || hrs || gender) ? ' AND ' : ''}`).toString().replaceAll("AND ,", "AND ").replaceAll(",L", "AND L") : ""
        }
        ${addservices && (rating || daysAWeek || hrs || gender) ? ' AND ' : ''}
        ${rating ? `rating >= ${rating}` : ""}
        ${rating && (daysAWeek || hrs || gender) ? ' AND ' : ''}
        ${daysAWeek.length !== 0 ? daysAWeek?.split(",").map((day, index) => `LOCATE('${day}', daysAWeek) != 0 ${daysAWeek.split(",")[index + 1] && (hrs || gender) ? ' AND ' : ''}`).toString().replaceAll("AND ,", "AND ").replaceAll(",L", "AND L") : ""
        }
        ${daysAWeek && (hrs || gender) ? ' AND ' : ''}
        ${hrs.length !== 0 ? hrs?.split(",").map((hr, index) => `LOCATE('${hr}', workingHrs) != 0 ${hrs.split(",")[index + 1] && gender ? ' AND ' : ''}`).toString().replaceAll("AND ,", "AND ").replaceAll(",L", "AND L") : ""
        }
        ${gender ? `gender = '${gender}'` : ""}
    `;

    connection.query(sqlQuery, (error, results) => {
        if (error) throw error;

        res.status(200).send(results);
    });
}

module.exports = filters;