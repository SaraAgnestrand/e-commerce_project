import './ProductDetail.css'
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from "../../context/ProductContext";
import { CartContext } from '../../context/CartContext';
import ImgSlider from '../../components/ImgSlider/ImgSlider'
import Footer from '../Footer/Footer'

const ProductDetail = () => {
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1); // Lokal state för antal
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState<Product | undefined>();
  const { id } = useParams();
  console.log("loading details")

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/products/${id}`
        );
        const data = await res.json()

        setProduct(data);

      } catch (error) {
        console.log(error);
      }
    }
    getProduct();

  }, [id]);

 
const handleAddToCart = () => {
  if(product) {
    addToCart(product._id, quantity);
  }
}

  return (
    <div className="productDetail-content">
        <div className="productDetail-section">
        {product && (
              <>

              <div className="img-container">
              {/* {Array.isArray(product.img) ? product.img : [product.img]} */}
              {/* <img src={product.img[0]} alt="Testbild" style={{ maxWidth: '500px', maxHeight: '500px' }} /> */}
              <ImgSlider img={product.img}/> 
              </div>
              <div className="product-info">
                <h3>{product.title}</h3>
                <p className='product-color'>{product.color}</p>
                <p>{product.description}</p>
                <p className='product-price'>{product.price} SEK</p>
                <div className='quantity-control'>
                  <button onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)}>-</button>
                  <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
                  <button onClick={() => setQuantity(q => q + 1)}>+</button>
                </div>
                <button className="buy-button" onClick={handleAddToCart}>Lägg i varukorg</button>
              </div>
            </>
          )}
          
        </div>
        
        <Footer />
    </div>
  )
}

export default ProductDetail

