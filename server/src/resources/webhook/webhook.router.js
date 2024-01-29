const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const webhookRouter = express.Router();
const { handleCheckoutSessionCompleted } = require('./webhook.controller');

webhookRouter.post('/', express.raw({type: 'application/json'}), (request, response) => {
    console.log("Inne i webhookRouter")
    //console.log('Inkommande webhook-begäran:', request);
    const sig = request.headers['stripe-signature'];
    //console.log('Stripe-signature:', sig);
    const event = request.body;
    
    // try {
    //     event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    //     console.log('Konstruerat event:', event);
    // } catch (err) {
    //     console.log(err)
    //     return response.status(400).send(`Webhook Error: ${err.message}`);
    // }

    console.log(`Hanterar event av typen: ${event.type}`);
    // Hantera olika typer av händelser
    switch (event.type) {
        case 'checkout.session.completed':
            console.log("Event: ", event)
            handleCheckoutSessionCompleted(event.data.object.id);
            console.log('Checkout session completed hanterades framgångsrikt.');
            break;
        // hantera andra händelser om det behövs
    }
    
    // Bekräfta mottagandet av webhook-händelsen
    response.json({received: true});
});

module.exports = webhookRouter;