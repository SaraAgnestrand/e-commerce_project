import { PropsWithChildren, createContext, useState } from "react";
import { Product } from "./ProductContext";


export interface CartItem extends Product {
    quantity: number;
  }

export interface Cart {
    cart: CartItem[],
    totalPrice: number,
    totalQuantity: number
  }

// Skapar en interface för CartContext för att definiera dess struktur.
interface CartContext {
  currentCart: Cart,
  setCurrentCart: (value: Cart) => void,
  addToCart: (productId: string, quantity: number) => void,
  removeFromCart: (productId: string) => void,
  decreaseQuantity: (productId: string) => void
}


export const CartContext = createContext<CartContext>({
  currentCart: { cart: [], totalPrice: 0, totalQuantity: 0 }, // Initiala värden för varukorgen
  setCurrentCart: () => {}, 
  addToCart: () => {}, 
  removeFromCart: () => {}, 
  decreaseQuantity: () => {} 
});


export function CartProvider({ children }: PropsWithChildren<any>) {
  
  const [currentCart, setCurrentCart] = useState<Cart>({
    cart: [],
    totalPrice: 0,
    totalQuantity: 0,
  });

  const addToCart = async (productId: string, quantity: number) => {
    try {
      // Först hämta produktdetaljerna från servern
      const response = await fetch(`http://localhost:3000/api/products/${productId}`);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const productToAdd = await response.json();
      productToAdd.price = parseFloat(productToAdd.price);
  
      // Kolla om produkten redan finns i varukorgen
      const cartItem = currentCart.cart.find(item => item._id === productId);
      if (cartItem) {
        // Om produkten finns, öka bara kvantiteten
        cartItem.quantity += quantity;
      } else {
        // Om produkten inte finns, lägg till den i varukorgen med angiven kvantitet
        currentCart.cart.push({ ...productToAdd, quantity });
      }

      // Uppdatera varukorgen
      updateCart();

      // Skicka uppdaterad varukorg till servern för att hantera sessionsdata
      try {
        await fetch("http://localhost:3000/api/cart", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cart: currentCart }),
        });
      } catch (error) {
        console.error('Error updating cart session:', error);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
    // const addToCart = async (productId: string, quantity: number) => { 
    //   try {
    //     const response = await fetch(`http://localhost:3000/api/products/${productId}`);
    
    //     if (!response.ok) {
    //       throw new Error(`Error: ${response.status}`);
    //     }
    
    //     const productToAdd = await response.json(); 
    //     productToAdd.price = parseFloat(productToAdd.price);
    
    //     const cartItem = currentCart.cart.find(item => item._id === productId);
    //     if (cartItem) {
    //       cartItem.quantity += quantity;
    //     } else {
          
    //       currentCart.cart.push({ ...productToAdd, quantity });
    //     }
    //     updateCart();
    //   } catch (error) {
    //     console.error('Error adding product to cart:', error);
    //   }
    // };
  
  
    
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

 