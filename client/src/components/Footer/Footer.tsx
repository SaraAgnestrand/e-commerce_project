import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <div>
      <div className="footer-section">
        <div className="footer-column">
          <h3>Support</h3>
          <p>FAQ & Kontakt</p>
          <p>Villkor</p>
          <p>Privacy policy</p>
          <p>Retur & Reklamationer</p>
        </div>
        <div className="footer-column">
          <h3>LightGallery</h3>
          <p>
            <Link to="/">Om oss</Link>
          </p>
          <p>För återförsäljare</p>
          <p>Design</p>
          <p>Hållbarhet</p>
        </div>
        <div className="footer-column">
          <h3>Följ oss</h3>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>TikTok</p>
          <p>Snapchat</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
