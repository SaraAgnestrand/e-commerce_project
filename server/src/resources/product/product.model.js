const { model, Schema, models, Types } = require("mongoose");
const Joi = require("joi");

//Definierar produktSchemat
const ProductSchema = new Schema(
    {
        _id: { type: Types.ObjectId, auto: true },
        title: { type:String, required:true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        price_id:{type: String, required:true },
        img: { type: [String], required: true },
        color: {type: String, required: true },
        inStock: { type: Number, required: true, default:0 },
        category: { type: String, required: true },
        deleted: { type: Boolean, required: false, default:false },
    }, { versionKey: false });


//Skapar eller hämtar modellen
const ProductModel = models.product || model("product", ProductSchema); 

//Definierar Joi Schemat för validering
const productJoiSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    price_id: Joi.string().required(),
    img: Joi.string().required(),
    color: Joi.string().required(),
    inStock: Joi.number().required(),
    category: Joi.string().required()
});

//Exporterar Modellen, Schemat och Joi Schemat
module.exports = { ProductModel, ProductSchema, productJoiSchema };