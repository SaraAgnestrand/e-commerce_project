const { ProductModel } = require("./product.model");

//Hämta alla produkter
 const getProducts = async(req, res) => {
    console.log("Controller is hit!")
    try{
        const products = await ProductModel.find();
        console.log("Products from DB:", products);
        res.status(200).json(products);
    } catch(error){
        console.log("Error in controller:", error.message);
        res.status(400).json(error);
        }   
};

//Hämta produkt med spcifikt id
const getProductById = async(req, res) => {
        const products = await ProductModel.findOne({_id:req.params.id})
        if (products) {
            res.status(200).json(products);
        } else {
            res.status(404).json("/" + req.params.id + ".*(not found)");
        }  
}

//Hämta alla produkter med specifik kategori
const getProductsByCategory = async (req, res) => {
    console.log("Requested category:", req.params.name);
    try{
        console.log("Fetching products for category:", req.params.name);
        const products = await ProductModel.find({category:req.params.name});
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json(error)
    }
}; 

//Deleata en produkt med specifikt id 
const deleteProduct = async (req, res, next) => {
    try {
        const existingProduct = await ProductModel.findById(req.params.id)
        if (!existingProduct) {
           res.status(404).json( req.params.id + "not found")
        }
        const product = await ProductModel.deleteOne({_id:req.params.id})
        res.status(204).json(product + " deleted");
    } catch (error) {
        res.status(500).json();
    }
}

//Skapa en produkt/Lägg till ny produkt
 const createProduct = async(req, res) => {
        try {
            const newProduct = await ProductModel.create(req.body);
            res.status(201).json(newProduct);      
        } catch (error) {
            res.status(500).json(error);
        }   
    }



//Upptatera/ändra en produkt
// const updateProduct = async(req, res) => {
//     if (req.body._id !== req.params.id) {
//       return res.status(400).json('Body and param id are not the same');
//     }
  
//     const product = await ProductModel.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true },
//     );
  
//     res.status(200).json(product);
//   }

module.exports = { getProducts, getProductById, getProductsByCategory, deleteProduct, createProduct };
//, updateProduct