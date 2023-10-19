const { Stripe } = require("stripe");
const connection = require("../../db/connection");

async function payment(req, res) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);
    const { email, priceId, redo } = req.body;

    connection.query(`SELECT stripeId from careseekers_ where email = '${email}'`, async (err, results) => {
        if (err) throw err;

        if (results.length !== 0) {
            const careseeker = results[0].stripeId;

            const session = await stripe.checkout.sessions.create({
                billing_address_collection: "auto",
                customer: careseeker,
                line_items: [
                    {
                        price: priceId,
                        quantity: 1
                    }
                ],
                mode: 'subscription',
                success_url: redo ? 'https://webapi.waysdatalabs.com/dashboard' : 'https://webapi.waysdatalabs.com/careseeker/registration',
                cancel_url: 'https://webapi.waysdatalabs.com/pricing'
            });
            res.status(200).json(session.url);
        }
    });
}
module.exports = payment;
