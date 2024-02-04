const { OrderModel } = require('./order.model');
const { ProductModel } = require('../../resources/product/product.model');

const createOrder = async (req, res, next) => {
    try {
        let totalOrderPrice = 0;
        for (const orderItem of req.body.orderItems) {
            let product = await ProductModel.findById(orderItem.product);

            if (product && product.inStock >= orderItem.quantity) {
                product.reserved += orderItem.quantity;
                product.inStock -= orderItem.quantity;
                totalOrderPrice += product.price * orderItem.quantity;
                await product.save();
            } else {
                return res.status(400).json({ message: "Not enough stock for product: " + product.name });
            }
        }

        const order = new OrderModel({
            orderItems: req.body.orderItems,
            customer: req.session._id,
            totalCost: totalOrderPrice,
            status: 'Pending',
            paymentConfirmation: false,
            createdAt: Date.now,
            updatedAt: Date,
        });

        await order.save();
        res.status(201).json(order);
    } catch (err) {
        next(err);
    }
}



module.exports = { createOrder };

