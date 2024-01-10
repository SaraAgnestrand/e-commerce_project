import { Product } from "../../context/ProductContext"
import { useNavigate } from "react-router-dom";
import "./ProductCard.css"

export interface ProductCardProps {
    products: Product;
}

function ProductCard({ products }: ProductCardProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${products._id}`); // antar att varje produkt har ett unikt 'id'
  };
  return (
    
          <div className="productCard-info" onClick={handleNavigate}>
              <img src={products.img} alt={products.title} />
              <div className="productCard-text">
                  <h3>{products.title}</h3>
                  <p>{products.color}</p>
                  <p className="price">{products.price} SEK</p>
              </div>
      </div>
     
  )
}

export default ProductCard;