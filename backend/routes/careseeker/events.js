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

    let subscription, status;

    switch (event.type) {
        case 'customer.subscription.deleted': {
            subscription = event.data.object;
            status = subscription.status;
            console.log(`Subscription status is ${status}.`);
            // Then define and call a method to handle the subscription deleted.
            // handleSubscriptionDeleted(subscriptionDeleted);
            break;
        }
        case 'customer.subscription.created': {
            status = event.data.object.status;
            let stripeId = event.data.object.customer;
            let { amount, nickname, interval } = event.data.object.plan;
            if (status === "active") {
                connection.query(`UPDATE careseekers_ SET status = 'active', planDuration = '${interval}', planType = '${nickname}', planPrice = '$${amount / 100}', expiryDate = ADDDATE(NOW(), INTERVAL 1 ${interval.toUpperCase()}) WHERE stripeId = '${stripeId}'`, (err) => { if (err) throw err; });

                connection.query(`SELECT id FROM careseekers_ WHERE stripeId = '${stripeId}'`, (error, results) => {
                    if (error) throw error;

                    connection.query(`INSERT INTO subscription (careseekerId, type, price) VALUES (${results[0].id}, '${nickname}', ${amount / 100})`, (err) => { if (err) throw err; });

                    connection.query(`INSERT INTO payment_history (careseekerId, description, price) VALUES (${results[0].id}, '${nickname}', ${amount / 100})`, (err) => { if (err) throw err; });
                })

                res.status(200).json({ "success": true });
            }
            break;
        }
        case 'customer.subscription.updated': {
            status = event.data.object.status;
            let stripeId = event.data.object.customer;
            let { amount, nickname, interval } = event.data.object.plan;
            if (status === "active") {
                connection.query(`UPDATE careseekers_ SET status = 'active', planDuration = '${interval}', planType = '${nickname}', planPrice = '$${amount / 100}', expiryDate = ADDDATE(NOW(), INTERVAL 1 ${interval.toUpperCase()}) WHERE stripeId = '${stripeId}'`, (err) => { if (err) throw err; });

                connection.query(`SELECT id FROM careseekers_ WHERE stripeId = '${stripeId}'`, (error, results) => {
                    if (error) throw error;

                    connection.query(`INSERT INTO subscription (careseekerId, type, price) VALUES (${results[0].id}, '${nickname}', ${amount / 100})`, (err) => { if (err) throw err; });

                    connection.query(`INSERT INTO payment_history (careseekerId, description, price) VALUES (${results[0].id}, '${nickname}', ${amount / 100})`, (err) => { if (err) throw err; });
                })

                res.status(200).json({ "success": true });
            }
            break;
        }
        case "charge.succeeded": {
            sendReceipt(event.data.object.receipt_email, event.data.object.receipt_url);
            res.status(200).send(true);
            break;
        }
        case "checkout.session.completed": {
            /** console.log(event.data.object.metadata); */
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

                    connection.query(`INSERT INTO payment_history (careseekerId, description, price) VALUES (${careseeker.id}, 'Appointment - ${caregiver.fname + " " + caregiver.lname}', ${price})`, (err) => { if (err) throw err; });

                    sendAppointment(careseekerEmail, careseeker.fname + " " + careseeker.lname, caregiver.fname + " " + caregiver.lname, "careseeker");
                    sendAppointment(caregiver.email, caregiver.fname + " " + caregiver.lname, careseeker.fname + " " + careseeker.lname, "caregiver");
                    res.status(200).json({ success: true });
                } catch (err) {
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                }
            }
            else {
                res.status(200).json(true);
            }
            break;
        }
        default:
            res.status(200).json(true);
    }
}

module.exports = webHook;