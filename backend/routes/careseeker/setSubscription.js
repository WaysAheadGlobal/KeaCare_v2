const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");

const prisma = new PrismaClient();

async function setSubscription(req, res) {
    const { planType, planDuration, planPrice, email } = req.body;

    const errors = validationResult(req);
    try {
        if (!errors.isEmpty() && errors.errors[0].path === 'email') {
            res.status(400).send('Invalid email address. Please try again.')
        } else {
            const updatedCareseeker = await prisma.careseekers_.update({
                where: {
                    email: email
                },
                data: {
                    planDuration: planDuration,
                    planType: planType,
                    planPrice: planPrice
                }
            });

            res.status(200).json({ "success": true, ...updatedCareseeker });
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = setSubscription;