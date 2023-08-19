const { Stripe } = require("stripe");
const connection = require("../../db/connection");

function checkDuplicateAppointments(req, res) {
    const { careseekerEmail, appointment } = req.body;

    let sqlQuery = "SELECT DISTINCT appointments_.* FROM appointments_ INNER JOIN careseekers_ WHERE appointments_.careseekerId = careseekers_.id"

    for (const key in appointment) {
        for (let i = 0; i < appointment[key].length; i++) {
            const time = appointment[key][i];
            if (i === 0) {
                sqlQuery += ` AND (appointments_.date = '${key}' AND LOCATE('${time}', appointments_.time))`;
            } else {
                sqlQuery += ` OR (appointments_.date = '${key}' AND LOCATE('${time}', appointments_.time))`;
            }
        }
    }
    sqlQuery += ` AND careseekers_.email = '${careseekerEmail}'`;

    connection.query(sqlQuery, (error, results) => {
        if (error) throw error;

        if (results.length !== 0) {
            res.status(403).json({ error: "Appointment already exists" });
        } else {
            res.status(200).json({ success: true });
        }
    })
}

async function appointmentFees(req, res) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const { careseekerEmail, caregiverId, price, appointment } = req.body;

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
        success_url: 'https://keacare.waysdatalabs.com/success.html',
        cancel_url: 'https://keacare.waysdatalabs.com/dashboard.html'
    });

    res.status(200).json(session.url);
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

module.exports = { appointmentFees, getAppointments, checkDuplicateAppointments };