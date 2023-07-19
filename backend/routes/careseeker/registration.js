const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");
/* const cloudinary = require("cloudinary").v2; */

const prisma = new PrismaClient();

/* cloudinary.config({
    cloud_name: 'dp80qqzsw',
    api_key: '867115631113898',
    api_secret: 'KoFw8fVjFfFRmiMwREAPoH0MOdQ'
}); */

async function Register(req, res) {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.');
        } else {
            const { email } = req.body;
            const careseeker = await prisma.careseekers_.findUnique({
                where: {
                    email: email
                }
            });

            if (careseeker) {
                try {
                    const { fname, lname, mobile, dob, gender, address, city, province, zipcode, device_type } = req.body;

                    /* const result = await cloudinary.uploader.upload(image, { public_id: careseeker.id, folder: "keacare" }); */

                    const updatedCareseeker = await prisma.careseekers_.update({
                        where: {
                            email: email
                        },
                        data: {
                            fname: fname,
                            lname: lname,
                            mobile: mobile,
                            dob: dob,
                            gender: gender,
                            address: address,
                            city: city,
                            province: province,
                            zipcode: zipcode,
                            device_type: device_type
                        }
                    });
                    res.status(200).json({ "success": true, ...updatedCareseeker });
                } catch (error) {
                    res.status(401).json({ "error": "Invalid Credentials" });
                }
            } else {
                res.status(401).json({ "error": "Invalid Credentials" });
            }
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = Register;