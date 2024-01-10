import { PropsWithChildren, createContext, useState, useEffect } from "react";
import { Product } from "./ProductContext";


export interface CartItem extends Product {
    quantity: number;
  }

export interface Cart {
    cart: CartItem[],
    totalPrice: number,
    totalQuantity: number
  }

  interface CartContext {
    currentCart: Cart,
    setCurrentCart: (value: Cart) => void,
    addToCart: (productId: string) => void, 
    removeFromCart: (productId: string) => void, 
    decreaseQuantity: (productId: string) => void 
  }

export const CartContext = createContext<CartContext>(null as any)

function CartProvider({ children }: PropsWithChildren) {
   
    const [currentCart, setCurrentCart] = useState<Cart>({
      cart: [],
      totalPrice: 0,
      totalQuantity: 0,
    });




    const addToCart = async (productId: string) => { 
      try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`);
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
    
        const productToAdd = await response.json(); 
        productToAdd.price = parseFloat(productToAdd.price);
    
        const cartItem = currentCart.cart.find(item => item._id === productId);
        if (cartItem) {
          cartItem.quantity += 1;
        } else {
          
          currentCart.cart.push({ ...productToAdd, quantity: 1 });
        }
        updateCart();
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    };
  
  
    
    const updateCart = () => {
      let totalQuantity = 0;
      let totalPrice = 0;
      currentCart.cart.forEach(item => {
        totalQuantity += item.quantity;
        totalPrice += item.quantity * item.price; // Antag att 'price' är ett nummer
      });
      setCurrentCart({ cart: [...currentCart.cart], totalQuantity, totalPrice });
    };
    const removeFromCart = (productId: string) => {
      const updatedCartItems = currentCart.cart.filter(item => item._id !== productId);
      refresh(updatedCartItems); 
    };
    
    const decreaseQuantity = (productId: string) => {
      const updatedCartItems = currentCart.cart.map(item => {
        if (item._id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      refresh(updatedCartItems); 
    };
    
    const refresh = (updatedCartItems: CartItem[]) => {
      let totalQuantity = 0;
      let totalPrice = 0;
    
      updatedCartItems.forEach(item => {
        totalQuantity += item.quantity;
        totalPrice += item.quantity * item.price;
      });
    
      
      setCurrentCart({ cart: updatedCartItems, totalQuantity, totalPrice });
    };
    
    return (
      <CartContext.Provider value={{ currentCart, setCurrentCart, addToCart, removeFromCart, decreaseQuantity }}>
        {children}
      </CartContext.Provider>
    );
}

 