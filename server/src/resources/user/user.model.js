const { Schema, model, models } = require("mongoose");
const Joi = require("joi");

//Definierar Schema för User
const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, selected: false }, 
    isAdmin: { type: Boolean, required: true, default: false },
});

//Skaper eller hämtar modellen
const UserModel = models.user || model("user", UserSchema);

//Definierar Joi Schemat för validering
const UserCreateValidationSchema = Joi.object({
    firstName: Joi.string().strict().required(),
    lastName: Joi.string().strict().required(),
    email: Joi.string().email().strict().required(),
    password: Joi.string().strict().required(),
    isAdmin: Joi.boolean().strict(),
});

//Exporterar Modellen, Joi Schemat och Schemat
module.exports = { UserModel, UserCreateValidationSchema, UserSchema };

