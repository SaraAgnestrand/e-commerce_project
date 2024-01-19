import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from "../../context/ProductContext";
import { CartContext } from '../../context/CartContext';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import './ProductDetail.css'



// Komponenten ProductDetail
const ProductDetail = () => {
  // Använder useContext för att få tillgång till CartContext
  const cartContext = useContext(CartContext);

  // Kontrollerar om CartContext finns
  if (!cartContext) {
    // Returnerar null eller hanterar felet om CartContext inte är tillgängligt
    return null; 
  }

  // Extraherar addToCart-funktionen från CartContext
  const { addToCart } = cartContext;

  // State för att hantera bildvisning och produktkvantitet
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | undefined>();

  // Använder useParams för att hämta produktens ID från URL:en
  const { id } = useParams<{ id: string }>();
  
  // useEffect för att hämta produktdetaljer när komponenten monteras eller id ändras
  useEffect(() => {
    const getProduct = async () => {
      try {
        // Gör en API-förfrågan för att hämta produktinformation
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        const data = await res.json()

        // Uppdaterar produktstatet med den hämtade datan
        setProduct(data);

      } catch (error) {
        // Hanterar eventuella fel vid API-förfrågan
        console.log(error);
      }
    }
    getProduct();

  }, [id]);

  // Funktion för att hantera bildvisning (vänster/höger navigering)
  const scroll = (direction:  'left' | 'right') => {
    if (!product) return; 

    // Uppdaterar currentSlide baserat på användarens interaktion
    if (direction === 'left') {
      setCurrentSlide((prevSlide) => (prevSlide === 0 ? product.img.length - 1 : prevSlide - 1));
    } else if (direction === 'right') {
      setCurrentSlide((prevSlide) => (prevSlide === product.img.length - 1 ? 0 : prevSlide + 1));
    }
  }

  // Funktion för att hantera läggning av produkt i varukorgen
  const handleAddToCart = () => {
    if (product && addToCart) {
      addToCart(product?._id, quantity);
      console.log(`Produkt [${product.title}] med kvantitet ${quantity} tillagd i varukorgen.`);
    }
  }

  return (
    
        <div className="productDetail-section">
        {product && (
              <>

<div className="img-container">
            <img className="product-img" src={product.img[currentSlide]} alt={product.title} />
            {product.img.length > 1 && (
              <div className="arrow-icons">
                <MdOutlineKeyboardArrowLeft className="arrows" onClick={() => scroll('left')} />
                <MdOutlineKeyboardArrowRight className="arrows" onClick={() => scroll('right')} />
              </div>
            )}
          </div>
              <div className="product-info">
                <h3>{product.title}</h3>
                <p className='product-color'>{product.color}</p>
                <p>{product.description}</p>
                <p className='product-price'>{product.price} SEK</p>
                <button className="buy-button" onClick={handleAddToCart}>Lägg i varukorg</button>
              </div>
            </>
          )}
    </div>
  )
}

export default ProductDetail

