import { Product } from "../../context/ProductContext"
import { Link } from 'react-router-dom';
import "./ProductCard.css"

export interface ProductCardProps {
    products: Product;
}

function ProductCard ({products}: ProductCardProps){
  console.log("Product Card:", products); // Loggar produkten för varje kort
    return (
    <div className="productCard-div">
        <Link to={"/" + products._id}>
        <div className="productCard-link" >
          {/* <img src={products.img} alt={products.title} /> */}
          <div className="productCard-info">
            <h3>{products.title}</h3>
          </div>

        </div>
      </Link>
      <div className="productCard-price">
        <p>{products.price} SEK</p>
        <button></button>
      </div>
    </div>
  )
}

export default ProductCard;