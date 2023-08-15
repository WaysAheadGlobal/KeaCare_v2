const { Stripe } = require("stripe");
const connection = require("../../db/connection");

async function appointmentFees(req, res) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const { careseekerEmail, caregiverId, price, appointment } = req.body;

    var flag = 0;

    for (const key in appointment) {
        connection.query(`SELECT appointments_.* FROM appointments_ INNER JOIN careseekers_ WHERE appointments_.careseekerId = careseekers_.id AND appointments_.date = '${key}' AND appointments_.time = '${appointment[key].toString()}' AND careseekers_.email = '${careseekerEmail}'`, (error, results) => {
            if (error) throw error;

            if (results.length !== 0) {
                flag = 1;
                return;
            }            
        })
    }
    console.log(flag);
    if (flag === 0) {
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: "auto",
            metadata: {
                type: "appointment",
                caregiverId: caregiverId,
                careseekerEmail: careseekerEmail,
                appointment: JSON.stringify(appointment),
                price: price
            },
            line_items: [
                {
                    price_data: {
                        unit_amount: price * 100,
                        currency: "cad",
                        product_data: {
                            name: "Appointment Fees",
                            description: "Appointment Fees",
                        },
                    },
                    quantity: 1,
                }
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/dashboard'
        });
    
        res.status(200).json(session.url);
    } else {
        res.status(403).json({ error: "Appointment already exists" });
    }
}

async function getAppointments(req, res) {
    const { careseekerEmail } = req.query;
    connection.query(`SELECT careseekers_.id FROM careseekers_ WHERE email = '${careseekerEmail}'`, (error, results) => {
        if (error) throw error;
        connection.query(`SELECT appointments_.*, caregivers_.imageUrl, caregivers_.speciality, caregivers_.fname, caregivers_.lname FROM appointments_ INNER JOIN caregivers_ WHERE appointments_.caregiverId = caregivers_.id AND appointments_.careseekerId = ${results[0].id};`, (err, _results) => {
            if (err) throw err;
            res.status(200).json(_results);
        })
    });
}

module.exports = { appointmentFees, getAppointments };