import ProductCard from"../ProductCard/ProductCard";
import { useState, useContext } from "react"; 
import { ProductContext } from "../../context/ProductContext"
import './ProductList.css'


const ProductList = () => {
  const { products } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1); 
  const productsPerPage = 12; 

    const indexOfLastProduct = currentPage * productsPerPage;  
    // const indexOfFirstProduct = indexOfLastProduct - productsPerPage; 
    const currentProducts = products.slice(0, indexOfLastProduct);
  
  // console.log("Context Products:", products); 

 
  const loadMoreProducts = () => {
    setCurrentPage(prevPage => prevPage + 1); 
  };
  return (
    <div className='ProductList-section'>
        <div className='productList-grid'>
        {currentProducts.map((product) => (
          
          <ProductCard key={product._id} product={product} />
        ))}
          </div>
    {indexOfLastProduct < products.length && (
        <div className='load-more-container'>
            <button onClick={loadMoreProducts}>Ladda fler produkter</button>
        </div>
    )}
</div>

  )
}

export default ProductList






// import ProductCard from"../ProductCard/ProductCard";
// import { useState, useContext } from "react"; 
// import { ProductContext } from "../../context/ProductContext"
// import './ProductList.css'


// const ProductList = () => {
//   const { products } = useContext(ProductContext);
//   const [currentPage, setCurrentPage] = useState(1); 
//   const productsPerPage = 12; 

//     const indexOfLastProduct = currentPage * productsPerPage;  
//     const indexOfFirstProduct = indexOfLastProduct - productsPerPage; 
//     const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct); 
  
//   console.log("Context Products:", products); 

 
//   const loadMoreProducts = () => {
//     setCurrentPage(prevPage => prevPage + 1); 
//   };
//   return (
//     <div className='ProductList-section'>
//         <div className='productList-grid'>
//         {currentProducts.map((product) => (
          
//           <ProductCard key={product._id} product={product} />
//         ))}
//           </div>
//     {indexOfLastProduct < products.length && (
//         <div className='load-more-container'>
//             <button onClick={loadMoreProducts}>Load More</button>
//         </div>
//     )}
// </div>

//   )
// }

// export default ProductList