const { validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const dayjs = require("dayjs");
const connection = require("../../db/connection");

const prisma = new PrismaClient();

async function Register(req, res) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {
            const { email } = req.body;
            const caregiver = await prisma.caregivers_.findFirst({
                where: {
                    email: email
                }
            });

            if (caregiver) {
                try {
                    const { fname, lname, mobile, dob, gender, address, city, province, zipcode, device_type, languages, speciality, experience, comfortableWithPets, task, rate, daysAWeek, workingHrs, bio, certifications, distance, education, ref1Email, ref1Name, ref1Phone, ref1Relation, ref2Email, ref2Name, ref2Phone, ref2Relation, governmentId, smoke, videoSurveillance, socialmedia } = req.body;


                    const updatedCaregiver = await prisma.caregivers_.update({
                        where: {
                            email: email,
                        },
                        data: {
                            fname: fname,
                            lname: lname,
                            mobile: mobile,
                            dob: dob,
                            age: dayjs(new Date()).year() - dob?.split("-")[0],
                            gender: gender,
                            address: address,
                            city: city,
                            province: province,
                            zipcode: zipcode,
                            device_type: device_type,
                            status: "active",
                            languages: languages,
                            speciality: speciality,
                            experience: parseFloat(experience),
                            comfortableWithPets: comfortableWithPets,
                            task: task,
                            rate: parseFloat(rate),
                            daysAWeek: daysAWeek,
                            workingHrs: workingHrs,
                            bio: bio,
                            certifications: certifications,
                            distance: distance,
                            education: education,
                            ref1Email: ref1Email,
                            ref1Name: ref1Name,
                            ref1Phone: ref1Phone,
                            ref1Relation: ref1Relation,
                            ref2Email: ref2Email,
                            ref2Name: ref2Name,
                            ref2Phone: ref2Phone,
                            ref2Relation: ref2Relation,
                            government_id: governmentId,
                            smoke: smoke,
                            videoSurveillance: videoSurveillance,
                            socialmedia: socialmedia
                        }
                    });
                    res.status(200).json({ "success": true, ...updatedCaregiver });
                } catch (err) {
                    console.log(err);
                    res.status(401).json({ "error": "Invalid Credentials" });
                }
            } else {
                res.status(404).json({ "error": "Caregiver not found" });
            }
        }
    }
    catch (err) {
        console.error(err);
    }
}

async function UploadDocuments(req, res) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {
            const { email } = req.body;
            const caregiver = await prisma.caregivers_.findFirst({
                where: {
                    email: email
                }
            });

            if (caregiver) {
                try {
                    const governmentId = req.files["governmentId"][0].filename;
                    const certificate = req.files["certificate"][0].filename;
                    const review = req.files["review"][0].filename;

                    connection.beginTransaction((err) => {
                        if (err) {
                            console.error(err);
                            connection.rollback();
                            res.status(401).json({ "error": "Invalid Credentials" });
                            return;
                        }

                        connection.query(`INSERT INTO certificates (caregiverId, url) VALUES (?, ?)`, [caregiver.id, "https://webapi.waysdatalabs.com" + "/keacare/api/assets/" + certificate], (err, result) => {
                            if (err) {
                                console.error(err);
                                connection.rollback();
                                res.status(401).json({ "error": "Invalid Credentials" });
                                return;
                            }
                            connection.query(`INSERT INTO documentProof (caregiverId, url) VALUES (?, ?)`, [caregiver.id, "https://webapi.waysdatalabs.com" + "/keacare/api/assets/" + governmentId], (err, result) => {
                                if (err) {
                                    console.error(err);
                                    connection.rollback();
                                    res.status(401).json({ "error": "Invalid Credentials" });
                                    return;
                                }
                                connection.query(`INSERT INTO otherReviews (caregiverId, url) VALUES (?, ?)`, [caregiver.id, "https://webapi.waysdatalabs.com" + "/keacare/api/assets/" + review], (err, result) => {
                                    if (err) {
                                        console.error(err);
                                        connection.rollback();
                                        res.status(401).json({ "error": "Invalid Credentials" });
                                        return;
                                    }

                                    connection.commit();
                                    res.status(200).json({ "success": true, "message": "Documents uploaded successfully"});
                                });
                            });
                        });
                    });
                } catch (err) {
                    console.log(err);
                    res.status(401).json({ "error": "Invalid Credentials" });
                }
            } else {
                res.status(404).json({ "error": "Caregiver not found" });
            }
        }
    }
    catch (err) {
        console.error(err);
    }
}

module.exports = { Register, UploadDocuments };