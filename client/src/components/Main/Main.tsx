import Home from '../Home/Home';
import ProductDetail from '../ProductDetail/ProductDetail';
import { Routes, Route } from 'react-router-dom';
import './Main.css'

const Main: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ProductDetail/>}/>
      </Routes>
    </div>
  )
}

export default Main;

//Ska jag ha med en sida som hanterar 404?
//<Route path="*" element={<NotFound />} />