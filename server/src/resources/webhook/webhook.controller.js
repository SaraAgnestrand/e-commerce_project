const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { OrderModel } = require('../order/order.model');
const {ProductModel} = require("../product/product.model");

async function handleCheckoutSessionCompleted(sessionId) {
    try {
        const order = await OrderModel.findOne({ orderNumber: sessionId });
        if (!order) {
            throw new Error(`Order with session ID ${sessionId} not found`);
        }
        // hantera logik när en order hittas...
        console.log('Order found:', order);

        // Placera logiken för att uppdatera lager inuti try-blocket
        for (const item of order.orderItems) {
            console.log("Item: ", item)
            const product = await ProductModel.findById(item.product);
            if (product) {
                // Minska inStock med kvantiteten i orderItem
                product.inStock = Math.max(0, product.inStock - item.quantity);
                await product.save(); // Spara den uppdaterade produkten
            } else {
                console.error(`Product with ID ${item.product} not found`);
            }
        }
        console.log('Order processed and stock updated.');
    } catch (error) {
        console.error("Error handling checkout session completed:", error);
        // Hantera fel, t.ex. skicka ett felmeddelande som respons
    }
}


module.exports = { handleCheckoutSessionCompleted };