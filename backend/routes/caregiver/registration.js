const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


cloudinary.config({
    cloud_name: 'dbimbo0su',
    api_key: '323346454524645',
    api_secret: 'XXosQxG2fnCfBSrPCZRwCI2e_cM'
});

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
                    const { fname, lname, mobile, dob, gender, address, city, province, zipcode, device_type, status, languages, speciality, experience, comfortableWithPets, task, rate, daysAWeek, workingHrs, bio, certifications, distance, education, image: { file }, ref1Email, ref1Name, ref1Phone, ref1Relation, ref2Email, ref2Name, ref2Phone, ref2Relation } = req.body;

                    const result = await cloudinary.uploader.upload(file, { public_id: caregiver.id, folder: "keacare" });

                    const updatedCaregiver = await prisma.caregivers_.update({
                        where: {
                            email: email,
                        },
                        data: {
                            imageUrl: result.secure_url,
                            fname: fname,
                            lname: lname,
                            mobile: mobile,
                            dob: dob,
                            gender: gender,
                            address: address,
                            city: city,
                            province: province,
                            zipcode: zipcode,
                            device_type: device_type,
                            status: status,
                            languages: languages,
                            speciality: speciality,
                            experience: experience,
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
                            ref2Relation: ref2Relation
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

module.exports = { Register };