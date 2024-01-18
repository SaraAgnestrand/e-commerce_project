// import { useParams } from 'react-router-dom';
// import { useCategories } from '../../context/CategoryContext';
// import { useContext } from "react"; 
// import { ProductContext } from "../../context/ProductContext";
// // import ProductCard from"../ProductCard/ProductCard";
// import ProductList from "../ProductList/ProductList";
// import './CategoryPage.css';

// const CategoryPage = () => {
//   const { categoryId } = useParams();
//   const { categories } = useCategories();
//   const { products } = useContext(ProductContext);

//   const categoryImages: { [key: string]: string } = {
//     'Bordslampor': 'https://royaldesign.se/image/1/herstal-vienda-bordslampa-2?w=1920&quality=80',
//     'Taklampor': 'https://royaldesign.se/image/1/house-doctor-volumen-lampa-6?w=1600&quality=80',
//     'Golvlampor': 'https://royaldesign.se/image/1/by-rydens-bazar-golvlampa-h147-cm-7?w=1920&quality=80',
//     'Vägglampor': 'https://royaldesign.se/image/1/fritz-hansen-caravaggio-read-vagglampa-14-cm-1?w=1920&quality=80'
//   };

//   const category = categories.find(category => category._id === categoryId);

//   const categoryName = category ? category.title : '';
//   const categoryProducts = products.filter(product => product.category === categoryName);
//   const categoryImage = categoryImages[categoryName]; // Hämtar rätt bild baserat på kategorinamnet

//   if (!category) {
//     return <div>Kategorin hittades inte</div>;
//   }

//   return (
//     <div>
//         <div className='categoryTitle-div'>
//           <div className="categoryImg-div">
//             <img className="Category-img" src={categoryImage} alt={`${categoryName} kategoribild`} />
//           </div>
//           <div className="categoryText-Div">
//             <h2>{category.title}</h2>
//             <p>{category.description}</p>
//           </div>
//         </div>
//         {/* Använd ProductList för att visa produkterna för den aktuella kategorin */}
//         <ProductList productsToShow={categoryProducts} />
//     </div>
//   );
// };
// export default CategoryPage;
















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

  const categoryImages: { [key: string]: string } = {
    'Bordslampor': 'https://royaldesign.se/image/1/herstal-vienda-bordslampa-2?w=1920&quality=80',
    'Taklampor': 'https://royaldesign.se/image/1/house-doctor-volumen-lampa-6?w=1600&quality=80',
    'Golvlampor': 'https://royaldesign.se/image/1/by-rydens-bazar-golvlampa-h147-cm-7?w=1920&quality=80',
    'Vägglampor': 'https://royaldesign.se/image/1/fritz-hansen-caravaggio-read-vagglampa-14-cm-1?w=1920&quality=80'
  };

  const category = categories.find(category => category._id === categoryId);

  const categoryName = category ? category.title : '';
  const categoryProducts = products.filter(product => product.category === categoryName);
  const categoryImage = categoryImages[categoryName]; // Hämtar rätt bild baserat på kategorinamnet

  if (!category) {
    return <div>Kategorin hittades inte</div>;
  }

  return (
    <div className='category-section'>
        <div className='categoryTitle-div'>
          <div className="categoryImg-div">
            <img className="Category-img" src={categoryImage} alt={`${categoryName} kategoribild`} />
          </div>
          <div className="categoryText-Div">
            <h2>{category.title}</h2>
            <p>{category.description}</p>
          </div>
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


