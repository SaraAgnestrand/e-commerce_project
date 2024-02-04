import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../context/ProductContext";
import { CartContext } from "../../context/CartContext";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import "./ProductDetail.css";

const ProductDetail = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    return null;
  }

  const { addToCart } = cartContext;

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | undefined>();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  const scroll = (direction: "left" | "right") => {
    if (!product) return;

    if (direction === "left") {
      setCurrentSlide((prevSlide) =>
        prevSlide === 0 ? product.img.length - 1 : prevSlide - 1
      );
    } else if (direction === "right") {
      setCurrentSlide((prevSlide) =>
        prevSlide === product.img.length - 1 ? 0 : prevSlide + 1
      );
    }
  };

  const handleAddToCart = () => {
    if (product && addToCart) {
      addToCart(product?._id, quantity);
      console.log(
        `Produkt [${product.title}] med kvantitet ${quantity} tillagd i varukorgen.`
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="productDetail-section">
      {product && (
        <>
          <div className="img-container">
            <img
              className="product-img"
              src={product.img[currentSlide]}
              alt={product.title}
            />
            {product.img.length > 1 && (
              <div className="arrow-icons">
                <MdOutlineKeyboardArrowLeft
                  className="arrows"
                  onClick={() => scroll("left")}
                />
                <MdOutlineKeyboardArrowRight
                  className="arrows"
                  onClick={() => scroll("right")}
                />
              </div>
            )}
          </div>
          <div className="product-info">
            <h3>{product.title}</h3>
            <p className="product-color">{product.color}</p>
            <p>{product.description}</p>
            <p className="product-price">{product.price} SEK</p>
            <button className="buy-button" onClick={handleAddToCart}>
              Lägg i varukorg
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
