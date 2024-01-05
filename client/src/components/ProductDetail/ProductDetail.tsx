import './ProductDetail.css'
import Footer from '../Footer/Footer'

const ProductDetail = () => {
  console.log("loading details")
  return (
    <div>
        <Footer />
    </div>
  )
}

export default ProductDetail


// import { useParams } from 'react-router-dom';

// const ProductDetail = () => {
//   const { id } = useParams();
//   // Använd 'id' för att hämta eller visa produktinformation
//   ...
// }