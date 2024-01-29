const express = require('express');
const { createOrder } = require('./order.controller');

//Skapar Express Router
const orderRouter = express.Router();

//Definierer API-rutter
orderRouter.post('', createOrder);

//Exporterar Routern
module.exports = orderRouter;