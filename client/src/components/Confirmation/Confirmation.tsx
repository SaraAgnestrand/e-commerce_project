import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import Cookies from "js-cookie";
import "./Confirmation.css";

const Confirmation = () => {
  const cartContext = useContext(CartContext);

  // Kontrollera om cartContext är tillgänglig
  if (!cartContext) {
    return <p>Varukorgen kunde inte laddas...</p>;
  }

  const { items, clearCart } = cartContext;
  const [localCartItems, setLocalCartItems] = useState(items);
  // Beräkna totalbeloppet
  const totalPrice = localCartItems.reduce(
    (total, localCartItem) =>
      total + localCartItem.price * localCartItem.quantity,
    0
  );

  useEffect(() => {
    // Uppdatera det lokala state när 'items' i CartContext ändras
    if (items && items.length > 0) {
      debugger;
      setLocalCartItems(items);
      console.log("---------------", localCartItems);
    }
  }, [items]);

  useEffect(() => {
    return () => {
      clearCart();
      Cookies.remove("cart");
    };
  }, []);

  return (
    <div className="confirmation-div">
      <h2>ORDERBEKRÄFTELSE:</h2>
      <div className="orderList">
        {localCartItems.map((localCartItems, index) => (
          <div className="orderItemCard" key={index}>
            {localCartItems.img && localCartItems.img.length > 0 ? (
              <img
                src={localCartItems.img[0]}
                alt={localCartItems.title}
                className="productImage"
              />
            ) : (
              <div className="placeholderImage">Ingen bild tillgänglig</div>
            )}
            <div className="orderItemText">
              <h3>{localCartItems.title}</h3>
              <p>Antal: {localCartItems.quantity}</p>
              <p>Pris: {localCartItems.price * localCartItems.quantity} kr</p>
            </div>
          </div>
        ))}
        <h3 className="totalText">Totalt belopp: {totalPrice} kr</h3>
      </div>
    </div>
  );
};

export default Confirmation;
