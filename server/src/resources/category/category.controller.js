const { CategoryModel } = require("./category.model")

//Hämta alla kategorier
const getCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json(categories);
    } catch {
        res.status(400).json(error);  
    }
};
//Hämta kategori med ett specifikt id
const getCategoryById = async(req, res, next) => {
    try{
        const category = await CategoryModel.findOne({_id:req.params.id});
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = { getCategories, getCategoryById };