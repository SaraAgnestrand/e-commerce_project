import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';
import { Drawer } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import "./CartDrawer.css"

interface CartDrawerProps {
  open: boolean;  
  onClose: () => void;  
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const cartContext = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  // Kontrollera om cartContext är tillgängligt
  if (!cartContext) {
    console.log("Inget context")
    return null;
  }

  const { items } = cartContext;
  const isUserLoggedIn = user !== null;

  // Funktion för att beräkna totalbeloppet
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  async function handlePayment() {
    try {
      const response = await fetch('http://localhost:3000/api/checkout/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(items), 
      });
  
      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url; 
      } else {
        const errorCode = response.status;
  const errorText = await response.text();
        console.error(`Error ${errorCode}: ${errorText}`);
      }
    } catch (error) {
      const e = error as Error;
      console.error('Network error or other error:', e.message);
    }
  }

  const handleLogin = () => {
    onClose(); 
    navigate('/login'); 
  };


  return (
    <Drawer title="Varukorg:" onClose={onClose} open={open}>
      {items.length === 0 ? (
        <div className="empty-cart-message">
          Din varukorg är tom.
        </div>
      ) : (
        <div> {/* En omslutande div runt hela innehållet om det finns varor i varukorgen */}
          {items.map(item => (
            <div className="cartItem-div" key={item._id}>
              <img src={item.img[0]} alt={item.title} />
              <div className='titleAndPrice'>
                <h3 className='productTitle'>{item.title}</h3>
                <div className='quantity-control'>
                  <p>Antal:</p>
                  <button className="circle-button" onClick={() => cartContext.decreaseQuantity(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="circle-button" onClick={() => cartContext.increaseQuantity(item._id)}>+</button>
                </div>
                <p className='priceParagraph'>
                  {item.quantity * item.price} SEK
                </p>
              </div>
              <DeleteOutlined onClick={() => cartContext.removeFromCart(item._id)} className="delete-icon" />
            </div>
          ))}
          <div className="totalCalc">
            <h3>Totalt pris: {calculateTotal()} SEK</h3>
            {isUserLoggedIn ? (
              <button onClick={handlePayment}>Gå till kassa</button>
            ) : (
              <div>
                <div className='loginMessage'>Vänligen logga in för att fortsätta till kassan.</div>
                <button onClick={handleLogin}>Logga in</button>
              </div>
            )}
          </div>
        </div>
      )}
    </Drawer>
  );

}

export default CartDrawer;






