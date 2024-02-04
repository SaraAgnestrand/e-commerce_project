const express = require('express');
const webhookRouter = express.Router();
const { handleCheckoutSessionCompleted } = require('./webhook.controller');

// Router that listens for the webhook event 'checkout.session.completed' from Stripe.
webhookRouter.post('/', express.raw({ type: 'application/json' }), (request, response) => {
    console.log("Inne i webhookRouter")
    const sig = request.headers['stripe-signature'];
    const event = request.body;

    console.log(`Hanterar event av typen: ${event.type}`);

    switch (event.type) {
        case 'checkout.session.completed':
            console.log("Event: ", event)
            handleCheckoutSessionCompleted(event.data.object.id);
            console.log('Checkout session completed hanterades framgångsrikt.');
            break;
    }

    response.json({ received: true });
});

module.exports = webhookRouter;