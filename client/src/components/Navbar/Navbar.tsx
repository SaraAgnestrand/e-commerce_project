import { Link } from 'react-router-dom';
import { BsHandbag } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import './Navbar.css'

const Navbar = () => {
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
        <GoPerson />
        <BsHandbag />
      </div>

    
   </div>
  )
}

export default Navbar;