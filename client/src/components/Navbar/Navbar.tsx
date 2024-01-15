import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BsHandbag } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { IoMenuOutline } from "react-icons/io5";
// import CartDrawer from '../../components/CartDrawer'; 
import { ShoppingOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";

import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
   <div className="navbar-section">
      <h2 className="logo">LightGallery</h2>
      <div className="nav-links">
        <Link to="/">
          Hem
        </Link>
        <Link to="/">
          Taklampor
        </Link>
        <Link to="/productdetail">
          Golvlampor
        </Link>
        <Link to="/">
          Vägglampor
        </Link>
        <Link to="/">
          Bordslampor
        </Link>

      </div>
      <div className="icon-div">
        <MenuOutlined className="menu-icon" onClick={() => setIsOpen
            (!isOpen)} />
        <UserOutlined />
        {/* <CartDrawer /> */}
        <ShoppingOutlined /> 
       
          
            
      </div>
      
      
    </div>
    
   
   
  )
}

export default Navbar;