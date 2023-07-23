const { Stripe } = require("stripe");

async function payment(req, res) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);
    const session = await stripe.checkout.sessions.create({
        billing_address_collection: "auto",
        line_items: [
            {
                price: req.body.priceId,
                quantity: 1
            }
        ],
        mode: 'subscription',
        success_url: `https://keacare.waysdatalabs.com/careseeker/registration?completed=true`,
        cancel_url: 'https://keacare.waysdatalabs.com/pricing'
    });
    res.status(200).json(session.url);
}
module.exports = payment;
