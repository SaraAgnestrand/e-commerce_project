const { model, Schema, models, Types } = require("mongoose");
const Joi = require("joi");


const ProductSchema = new Schema(
    {
        _id: { type: Types.ObjectId, auto: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        price_id: { type: String, required: true },
        img: { type: [String], required: true },
        color: { type: String, required: true },
        inStock: { type: Number, required: true, default: 0 },
        category: { type: String, required: true },
        deleted: { type: Boolean, required: false, default: false },
        reserved: { type: Number, required: true, default: 0 },
    }, { versionKey: false });

const ProductModel = models.product || model("product", ProductSchema);

const productJoiSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    price_id: Joi.string().required(),
    img: Joi.string().required(),
    color: Joi.string().required(),
    inStock: Joi.number().required(),
    category: Joi.string().required(),
    reserved: Joi.number().min(0).default(0)
});

module.exports = { ProductModel, ProductSchema, productJoiSchema };