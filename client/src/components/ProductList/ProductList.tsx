import ProductCard from"../ProductCard/ProductCard";
import { useState, useContext } from "react"; 
import { ProductContext } from "../../context/ProductContext"
import './ProductList.css'



  

const ProductList = () => {
  const { products } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1); // Håller reda på nuvarande sida
  const productsPerPage = 12; // Antal produkter per sida

    // Beräkna index för de produkter som ska visas
    const indexOfLastProduct = currentPage * productsPerPage; // Index för sista produkten på nuvarande sida
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // Index för första produkten på nuvarande sida
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct); // Hämta produkterna för nuvarande sida
  
  console.log("Context Products:", products); // Loggar produkterna från Context

  // Funktion för att ladda fler produkter (nästa sida)
  const loadMoreProducts = () => {
    setCurrentPage(prevPage => prevPage + 1); // Uppdaterar nuvarande sida till nästa sida
  };
  return (
    <div className='ProductList-section'>
        <div className='productList-grid'>
        {currentProducts.map((product) => (
          // Renderar varje produktkort för de produkter som finns på nuvarande sida
          <ProductCard key={product._id} products={product} />
        ))}
      </div>
      {indexOfLastProduct < products.length && (
        // Visar "Load More"-knappen om det finns fler produkter att ladda
        <button onClick={loadMoreProducts}>Load More</button>
      )}
    </div>
  )
}

export default ProductList