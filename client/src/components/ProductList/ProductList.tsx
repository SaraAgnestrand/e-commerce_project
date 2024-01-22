import ProductCard from"../ProductCard/ProductCard";
import { useState, useContext } from "react"; 
import { ProductContext } from "../../context/ProductContext"
import { UpCircleOutlined } from "@ant-design/icons"; <UpCircleOutlined />
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

 
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };
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
              <UpCircleOutlined className="scroll-to-top-icon" onClick={scrollToTop} />
          </div>
      </div>
  );
};

export default ProductList



