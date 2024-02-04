import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Confirmation from "../Confirmation/Confirmation";
import CategoryPage from "../CategoryPage/CategoryPage";
import { Routes, Route } from "react-router-dom";
import "./Main.css";

const Main: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ProductDetail />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Confirmation" element={<Confirmation />} />
      </Routes>
    </div>
  );
};

export default Main;
