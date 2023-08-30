const { Stripe } = require('stripe');
const { sendReceipt, sendAppointment } = require('../../mail/MailService');
const connection = require('../../db/connection');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function webHook(req, res) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_ENDPOINT_SECRET);
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

            /* connection.query(`SELECT id, fname, lname FROM careseekers_ WHERE email = '${email}'`, (error, results) => {
                if (error) throw error;

                const careseeker = results[0];
                if (careseeker) {
                    connection.query(`SELECT id, fname, lname FROM caregivers_ WHERE id = ${caregiverId}`, (err, results_) => {
                        if (err) throw err;

                        const caregiver = results_[0];
                        if (caregiver) {
                            const _appointment = JSON.parse(appointment);

                            for (const key in _appointment) {
                                connection.query(`INSERT INTO appointments_(totalPrice, time, status, modified_on, careseekerId, caregiverId, date) VALUES (${price}, '${_appointment[key].toString()}', 'Upcoming', NOW(), ${careseeker.id}, ${caregiverId}, '${key}')`, (err_) => {
                                    if (err_) throw err_;
                                })
                            }
                            sendAppointment(careseekerEmail, careseeker.fname + " " + careseeker.lname, caregiver.fname + " " + caregiver.lname);
                            sendAppointment(caregiver.email, caregiver.fname + " " + caregiver.lname, careseeker.fname + " " + careseeker.lname);
                            res.status(200).json({ success: true });
                        } else {
                            res.status(401).json({ success: false, error: "Invalid Credentials" });
                        }
                    })
                } else {
                    res.status(401).json({ success: false, error: "Invalid Credentials" });
                }
            }) */
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
                await prisma.appointments_.create({
                    data: {
                        caregiverId: parseInt(caregiverId),
                        careseekerId: careseeker.id,
                        date: _appointment.date,
                        time: _appointment.time,
                        status: "Upcoming",
                        totalPrice: parseFloat(price),
                    }
                });
                sendAppointment(careseekerEmail, careseeker.fname + " " + careseeker.lname, caregiver.fname + " " + caregiver.lname);
                sendAppointment(caregiver.email, caregiver.fname + " " + caregiver.lname, careseeker.fname + " " + careseeker.lname);
                res.status(200).json({ success: true });
            } catch (err) {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        } else if (type === "subscription") {
            const { planType, planDuration, planPrice, email } = event.data.object.metadata;

            connection.query(`UPDATE careseekers_ SET status = 'active', planDuration = '${planDuration}', planType = '${planType}', planPrice = '${planPrice}', expiryDate = ADDDATE(created_at, INTERVAL 1 ${planDuration.toUpperCase()}) WHERE email = '${email}'`, (err) => { throw err; });

            connection.query(`SELECT id FROM careseekers_ WHERE email = '${email}'`, (error, results) => {
                if (error) throw error;

                connection.query(`INSERT INTO subscription (careseekerId, type, price) VALUES (${results[0].id}, '${planType}', ${planPrice})`, (err) => { throw err; })
            })

            res.status(200).json({ "success": true });
        }
    } else {
        res.status(200).json(true);
    }
}

module.exports = webHook;