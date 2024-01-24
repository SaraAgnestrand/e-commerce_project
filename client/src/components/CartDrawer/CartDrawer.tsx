import React, { useContext } from 'react';
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

  // Kontrollera om cartContext är tillgängligt
  if (!cartContext) {
    console.log("Inget context")
    return null;
  }

  const { items } = cartContext;

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
        body: JSON.stringify(items), // Skicka din kundvagn här
      });
  
      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url; // Omdirigera användaren till Stripe Checkout
      } else {
        // Hantera fel här
      }
    } catch (error) {
      // Hantera nätverksfel eller andra fel här
    }
  }


  return (
    <Drawer title="Varukorg:" onClose={onClose} open={open}>
       {items.length === 0 ? (
        <div className="empty-cart-message">
          Din varukorg är tom.
        </div>
      ) : 
      <>
      {items.map(item => (
        <div className="cartItem-div" key={item._id}>
          {/* <div className="imgDiv"></div> */}
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
      <button onClick={handlePayment}>Gå till kassa</button>
    </div>
    </>}
    </Drawer>
    );
};

export default CartDrawer;






