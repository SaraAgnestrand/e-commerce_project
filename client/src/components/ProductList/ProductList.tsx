import ProductCard from"../ProductCard/ProductCard";
import { useState, useContext, useEffect } from "react"; 
import { ProductContext } from "../../context/ProductContext"
// import { UpCircleOutlined } from "@ant-design/icons"; 
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import './ProductList.css'


const ProductList = () => {
  const { products } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1); 
  const productsPerPage = 12; 

    const indexOfLastProduct = currentPage * productsPerPage;  
    const currentProducts = products.slice(0, indexOfLastProduct);

 
  const loadMoreProducts = () => {
    setCurrentPage(prevPage => prevPage + 1); 
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    return (
      <div className='ProductList-section'>
          <div className='productList-grid'>
              {currentProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className='actions-container'>
              {indexOfLastProduct < products.length && (
                  <button onClick={loadMoreProducts}>Ladda fler produkter</button>
              )}
              <ScrollToTop />
          </div>
      </div>
  );
};

export default ProductList



