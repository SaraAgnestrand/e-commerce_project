import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import CartDrawer from "../CartDrawer/CartDrawer"
import { ShoppingOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from 'antd';
import { CartContext } from '../../context/CartContext';
import { useCategories } from '../../context/CategoryContext';
import Banner from '../Banner/Banner'
import './Navbar.css'

const Navbar = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const cartContext = useContext(CartContext);
  const { categories } = useCategories(); 

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

  const handleCategoryClick = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };
  
  const totalItemsInCart = items.reduce((total, item) => total + item.quantity, 0);

  // Skapa en Menu för dropdown
  const categoryMenu = (
    <Menu>
      {categories && categories.map(category => (
        <Menu.Item key={category._id}>
          <Link to={`/category/${category._id}`}>
            {category.title}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  // Rätta rill bug med depricated längre ned
  return (
    <div className="navbar-section">
      <div className="top-row">
        <Dropdown overlay={categoryMenu} onVisibleChange=   {setIsCategoriesOpen} visible={isCategoriesOpen}>
        <MenuOutlined className="menu-icon" onClick={handleCategoryClick} />
        </Dropdown>
        <Link to="/"> <h2 className="logo">LightGallery</h2></Link>
        <div className="nav-links">
            <Link to="/LoginForm">LOGGA In</Link>
            <Link to="/RegisterForm">Skapa konto</Link>
              
            {categories && categories.map(category => (
              <Link key={category._id} to={`/category/${category.   _id}`}>
              {category.title}
              </Link>
            ))}
        </div>
        <div className="icon-div">
          <UserOutlined className='user-icon' />
          <div className="cart-icon-container">
            <ShoppingOutlined className="cart-icon" onClick={showCartDrawer} />
            {totalItemsInCart > 0 && (
              <span className="cart-badge">{totalItemsInCart}</span>
            )}
          </div>
          <CartDrawer open={isCartOpen} onClose=  {closeCartDrawer} />
          </div>
        </div>
        <Banner /> 
    </div>
  );
}


export default Navbar;