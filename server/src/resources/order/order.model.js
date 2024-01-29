const { model, Schema, models } = require("mongoose");
const Joi = require("joi");
const JoiObjectId = require('joi-objectid')(Joi);

const orderItemsSchema = new Schema (
    {
        product: { type:Schema.Types.ObjectId, ref: "product", required: true },
        quantity: { type: Number, default: 0 },
        price: { type: Number, default: 0 },
    },
    { _id: false }
);

const OrderSchema = new Schema (
    {
        orderNumber: {
            type: String,
            required: true, 
        },
        customer: { type: Schema. Types.ObjectId, ref: "user", required: false },
        orderItems: { type: [orderItemsSchema], required: true },
        totalCost: {
            type: Number,
            required: true,
          },
        status: {
            type: String,
            enum: ['Pending', 'Paid'],
            default: 'Pending',
          },
          paymentConfirmation: {
            type: Boolean,
            default: false,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
          updatedAt: {
            type: Date,
          },
          
    }
)

const OrderModel = models.order || model("order", OrderSchema);

const orderItemJoiSchema = Joi.object({
    product: JoiObjectId().required(),
    quantity: Joi.number().min(1).required(),  
    price: Joi.number().min(0).required(),
});

const orderItemsJoiArraySchema = Joi.array().items(orderItemJoiSchema).required();

const OrderCreateValidationSchema = Joi.object({
    orderNumber: Joi.string()
      .required(),
  
    customer: JoiObjectId()
      .optional(),
  
    orderItems: orderItemsJoiArraySchema,
  
    totalCost: Joi.number()
      .required(),
  
    status: Joi.string()
      .valid('Pending', 'Paid')
      .default('Pending'),
  
    paymentConfirmation: Joi.boolean()
      .default(false),
  
    createdAt: Joi.date()
      .default(() => new Date())
      .required(),
  
    updatedAt: Joi.date()
      .optional()
  });


  module.exports = {
    OrderModel,
    OrderCreateValidationSchema
    
  };