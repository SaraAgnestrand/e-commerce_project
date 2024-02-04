import { Product } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
export interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${product._id}`);
  };

  return (
    <div className="productCard-info" onClick={handleNavigate}>
      <img src={product.img[0]} alt={product.title} />
      <div className="productCard-text">
        <h3>{product.title}</h3>
        <p>{product.color}</p>
        <p className="price">{product.price} SEK</p>
      </div>
    </div>
  );
}

export default ProductCard;
