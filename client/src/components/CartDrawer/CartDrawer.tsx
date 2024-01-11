import { useState, useContext } from "react";
import { Drawer, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { CartContext } from '../../context/CartContext';
import "./CartDrawer.css";
// import ProductsInCart from "../../ProductsInCart/ProductsInCart";

const CartDrawer = () => {
    const [open, setOpen] = useState(false);
    const { currentCart } = useContext(CartContext);
    const showDrawer = () => {
        setOpen(true);
      };
  return (
    <>
    <ShoppingCartOutlined type="primary" onClick={showDrawer} />
    <Drawer title="Varukorg" placement="right"  open={open}>
      <div className="CartDrawer-div">
        <div>
         {/* {<ProductsInCart />} */}
        </div>
      </div>
      <hr />
      <div className="drawerBottom">
        <div>
          <h4>Summa:</h4>
          <h3>{currentCart.totalPrice} kr</h3>
        </div>
          {/* <Button onClick={onClose} disabled= {!currentCart.totalQuantity } type="primary" htmlType="submit"> */}
            
          {/* </Button> */}
      </div>
    </Drawer>
  </>
  )
}

export default CartDrawer



