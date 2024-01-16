import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import CartDrawer from "../CartDrawer/CartDrawer"
import { ShoppingOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";
import { CartContext } from '../../context/CartContext';
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const cartContext = useContext(CartContext);
  
  if (!cartContext) {
    return null;
  }

  const { items } = cartContext;

  const showCartDrawer = () => {
    setIsCartOpen(true);
  };  

  const closeCartDrawer = () => {
    setIsCartOpen(false);
  };
  
  const totalItemsInCart = items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <div className="navbar-section">
    <h2 className="logo">LightGallery</h2>
    <div className="nav-links">
      <Link to="/">Hem</Link>
      <Link to="/">Taklampor</Link>
      <Link to="/productdetail">Golvlampor</Link>
      <Link to="/">Vägglampor</Link>
      <Link to="/">Bordslampor</Link>
    </div>
    <div className="icon-div">
      <MenuOutlined className="menu-icon" onClick={() => setIsOpen(!isOpen)} />
      <UserOutlined />
      <div className="cart-icon-container">
        <ShoppingOutlined onClick={showCartDrawer} />
        {totalItemsInCart > 0 && (
          <span className="cart-badge">{totalItemsInCart}</span>
        )}
      </div>
      <CartDrawer open={isCartOpen} onClose={closeCartDrawer} />
    </div>
  </div>
);

}

export default Navbar;