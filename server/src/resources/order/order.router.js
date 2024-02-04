const express = require('express');
const { createOrder } = require('./order.controller');

const orderRouter = express.Router();

orderRouter.post('', createOrder);

module.exports = orderRouter;