const { Schema, model, models, Types } = require("mongoose");

//Definition av Schema för kategorier
const CategorySchema = new Schema({
    _id: { type: Types.ObjectId, auto: true },
    title: { type:String, required: true },
    description: {type: String, required: true }
});

//Skapar eller hämtar modellen
const CategoryModel = models.category || model("category", CategorySchema);

//Exporterar modellen och schemet
module.exports = { CategoryModel, CategorySchema };