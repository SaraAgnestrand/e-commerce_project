const { CategoryModel } = require("./category.model")
//getCategories

const getCategories = async () => {
    try {
        const categories = await CategoryModel.find();
        console.log("Categories from controller:", categories);
        return categories;
    } catch {
        console.log("Error in controller:", error);
        throw error;    
    }
};

module.exports = { getCategories };