import Home from '../Home/Home';
import ProductDetail from '../ProductDetail/ProductDetail';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Routes, Route } from 'react-router-dom';
import './Main.css'

const Main: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ProductDetail/>}/>
        <Route path= "/LoginForm" element={<LoginForm />}/>
        <Route path= "/RegisterForm" element={<RegisterForm />}/>
      </Routes>
    </div>
  )
}

export default Main;
