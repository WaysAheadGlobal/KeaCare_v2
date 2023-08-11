const { Stripe } = require('stripe');
const { sendReceipt, sendAppointment } = require('../../mail/MailService');
/** const connection = require('../../db/connection'); */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function webHook(req, res) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(JSON.stringify(req.body), sig, process.env.STRIPE_ENDPOINT_SECRET);
    } catch (err) {
        console.log(`Error message: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Cast event data to Stripe object
    if (event.type === "charge.succeeded") {
        /** console.log(event.data.object.receipt_url); */
        sendReceipt(event.data.object.receipt_email, event.data.object.receipt_url);
        res.status(200).send(true);
    } else if (event.type === "checkout.session.completed") {
        /* console.log(event.data.object.metadata); */
        const { type } = event.data.object.metadata;

        if (type === "appointment") {
            const { appointment, careseekerEmail, caregiverId, price } = event.data.object.metadata;
            const careseeker = await prisma.careseekers_.findUnique({
                select: {
                    id: true,
                    fname: true,
                    lname: true
                },
                where: {
                    email: careseekerEmail,
                }
            });
            const caregiver = await prisma.caregivers_.findUnique({
                where: {
                    id: parseInt(caregiverId)
                }
            });
            const _appointment = JSON.parse(appointment);
            try {
                for (const key in _appointment) {
                    await prisma.appointments_.create({
                        data: {
                            caregiverId: parseInt(caregiverId),
                            careseekerId: careseeker.id,
                            date: key,
                            time: _appointment[key].toString(),
                            status: "Upcoming",
                            totalPrice: parseFloat(price),
                        }
                    });
                }
                sendAppointment(careseekerEmail, careseeker.fname + " " + careseeker.lname, caregiver.fname + " " + caregiver.lname);
                sendAppointment(caregiver.email, caregiver.fname + " " + caregiver.lname, careseeker.fname + " " + careseeker.lname);
                res.status(200).json({ success: true });
            } catch (err) {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }

            /** connection.query(`SELECT id FROM careseekers_ WHERE email = '${careseekerEmail}'`, (error, result, fields) => {
                if (error) throw error;
                console.log(result[0].id);
                const _appointment = JSON.parse(appointment);
                try {
                    for (const key in _appointment) {
                        connection.query(`INSERT INTO appointments_ (totalPrice, time, status, created_on, modified_on, careseekerId, date, caregiverId) VALUES (${price}, '${_appointment[key].toString()}', 'Upcoming', NOW(), NOW(), ${result[0].id}, '${key}', ${caregiverId})`, (err) => {
                            if (err) throw err;
                        });
                    }

                    res.status(200).json({ success: true });
                } catch (err) {
                    console.error(err);
                    res.status(500).send("Internal Server Error");
                }
            }); */
        } else if (type === "subscription") {
            const { planType, planDuration, planPrice, email } = event.data.object.metadata;

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

            res.status(200).json({ "success": true });
        }
    } else {
        res.status(200).json(true);
    }
}

module.exports = webHook;