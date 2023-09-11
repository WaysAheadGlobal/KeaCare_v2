const { Stripe } = require("stripe");
const connection = require("../../db/connection");

const stripe = new Stripe(process.env.STRIPE_API_KEY);

async function portal(req, res) {
    // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
    // Typically this is stored alongside the authenticated user in your database.
    const { email } = req.query;

    // This is the url to which the customer will be redirected when they are done
    // managing their billing with the portal.
    const returnUrl = "https://keacare.waysdatalabs.com/careseeker/account";

    connection.query(`SELECT stripeId FROM careseekers_ WHERE email = '${email}'`, async (err, results) => {
        if (err) throw err;

        const stripeId = results[0].stripeId;
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: stripeId,
            return_url: returnUrl,
        });

        res.status(200).json({
            url: portalSession.url
        });
    });
}

module.exports = portal;