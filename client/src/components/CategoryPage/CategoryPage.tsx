import { useParams } from 'react-router-dom';
import { useCategories } from '../../context/CategoryContext';
import { useContext } from "react"; 
import { ProductContext } from "../../context/ProductContext";
import ProductCard from"../ProductCard/ProductCard";
import './CategoryPage.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { categories } = useCategories();
  const { products } = useContext(ProductContext);

  const category = categories.find(category => category._id === categoryId);

  
  const categoryName = category ? category.title : '';
  const categoryProducts = products.filter(product => product.category === categoryName);

  if (!category) {
    return <div>Kategorin hittades inte</div>;
  }

  return (
    <div>
        <div className="categoryTitle-div">
            <h2>{category.title}</h2>
            <p>{category.description}</p>
        </div>
        <div className='categoryProductList-grid'>
          {categoryProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
    </div>
  );
};

export default CategoryPage;