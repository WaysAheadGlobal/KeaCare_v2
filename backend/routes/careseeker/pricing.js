const { Stripe } = require("stripe");

async function getProducts(req, res) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);
    const prices = await stripe.prices.list({
        limit: 4
    });
    res.status(200).json(prices.data);
}

module.exports = getProducts;
