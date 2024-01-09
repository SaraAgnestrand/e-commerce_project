import { Product } from "../../context/ProductContext"
import { Link } from 'react-router-dom';
import "./ProductCard.css"

export interface ProductCardProps {
    products: Product;
}

function ProductCard({ products }: ProductCardProps) {
  return (
    <Link to={`/${products._id}`} style={{ textDecoration: 'none' }}>
      <div className="productCard-div">
          <div className="productCard-info">
              <img src={products.img} alt={products.title} />
              <div className="productCard-text">
                  <h3>{products.title}</h3>
                  <p>{products.color}</p>
                  <p className="price">{products.price} SEK</p>
              </div>
          </div>
      </div>
    </Link>
  )
}

export default ProductCard;