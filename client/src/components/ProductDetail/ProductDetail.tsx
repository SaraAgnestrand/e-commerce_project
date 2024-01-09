import './ProductDetail.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from "../../context/ProductContext";
import Footer from '../Footer/Footer'

const ProductDetail = () => {
  const [product, setProducts] = useState<Product | undefined>();
  const { id } = useParams();
  console.log("loading details")

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/products/${id}`
        );
        const data = await res.json()

        setProducts(data);

      } catch (error) {
        console.log(error);
      }
    }
    getProducts();

  }, []);
  return (
    <div>
        <div className="productDetail-section">
        {product && (
          <div className="img-container">
          <img src={product.img} alt={product.title} />
          </div>
          )}
        </div>
        <Footer />
    </div>
  )
}

export default ProductDetail

