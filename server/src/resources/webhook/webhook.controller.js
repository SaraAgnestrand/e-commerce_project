const { OrderModel } = require('../order/order.model');
const { ProductModel } = require("../product/product.model");

async function handleCheckoutSessionCompleted(sessionId) {
    try {
        const order = await OrderModel.findOne({ orderNumber: sessionId });
        if (!order) {
            throw new Error(`Order with session ID ${sessionId} not found`);
        }
        console.log('Order found:', order);
        order.status = "Paid";
        await order.save();
        for (const item of order.orderItems) {
            console.log("Item: ", item)
            const product = await ProductModel.findById(item.product);
            if (product) {
                product.inStock = Math.max(0, product.inStock - item.quantity);
                await product.save();
            } else {
                console.error(`Product with ID ${item.product} not found`);
            }
        }
        console.log('Order processed and stock updated.');
    } catch (error) {
        console.error("Error handling checkout session completed:", error);
    }
}

module.exports = { handleCheckoutSessionCompleted };