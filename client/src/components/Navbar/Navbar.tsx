import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BsHandbag } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { TiThMenu } from "react-icons/ti";
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
   <div className="navbar-section">
      <h2 className="logo">LightGallery</h2>
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                <TiThMenu />
            </div>
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
        <GoPerson />
        <BsHandbag />
      </div>

    
   </div>
  )
}

export default Navbar;