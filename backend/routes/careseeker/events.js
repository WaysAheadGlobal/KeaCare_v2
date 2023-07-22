const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function webHook(request, response) {
    const payload = request.body;
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_ENDPOINT_SECRET);
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            event.data.object.id,
            {
                expand: ['line_items'],
            }
        );
        const lineItems = sessionWithLineItems.line_items;

        // Fulfill the purchase...
        fulfillOrder(lineItems);

        await prisma.careseekers_.update({
            where: {
                email: event.data.customer_details.email
            },
            data: {}
        })
    }

    response.status(200).end();
};

module.exports = webHook;