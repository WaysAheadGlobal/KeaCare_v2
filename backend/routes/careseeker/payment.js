const { Stripe } = require("stripe");

async function payment(req, res) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);
    const { planType, planDuration, planPrice, email, priceId } = req.body;
    const session = await stripe.checkout.sessions.create({
        billing_address_collection: "auto",
        metadata: {
            type: "subscription",
            planType: planType,
            planDuration: planDuration,
            planPrice: planPrice,
            email: email
        },
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
        mode: 'subscription',
        success_url: `https://webapi.waysdatalabs.com/careseeker/registration`,
        cancel_url: 'https://webapi.waysdatalabs.com/pricing'
    });
    res.status(200).json(session.url);
}
module.exports = payment;
