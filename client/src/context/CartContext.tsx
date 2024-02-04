import React, { createContext, useState, PropsWithChildren } from "react";
import Cookies from "js-cookie";
import { Product } from "./ProductContext";

// Definierar en utvidgning av Product-typen för att inkludera kvantitetexport
interface CartItem extends Product {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<Cart | undefined>(undefined);

export const CartProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const cartCookie = Cookies.get("cart");

    console.log("Cart Cookie value:", cartCookie); // Loggar värdet av 'cart' cookien

    if (cartCookie) {
      try {
        return JSON.parse(cartCookie); // Försöker tolka 'cartCookie' som JSON
      } catch (error) {
        console.error("Error parsing cart cookie as JSON:", error); // Loggar fel vid misslyckad JSON-parsning
        return []; // Returnerar en tom lista vid fel
      }
    } else {
      return []; // Returnerar en tom lista om 'cartCookie' är undefined
    }
  });

  const updateCartItems = (newItems: CartItem[]) => {
    setItems(newItems);
    Cookies.set("cart", JSON.stringify(newItems), { sameSite: "strict" });
  };

  const fetchProduct = async (productId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Fetch Error:", error);
      return null;
    }
  };

  // Asynkron funktion 'addToCart' lägger till produkter i varukorgen
  const addToCart = async (productId: string, quantity: number) => {
    console.log("Product ID:", productId);
    // Anropar 'fetchProduct' för att hämta detaljer om den önskade produkten med hjälp av dess ID
    const product = await fetchProduct(productId);

    // Kontrollerar om produktinformationen hämtades framgångsrikt
    if (product) {
      // Söker igenom den nuvarande varukorgslistan för att se om produkten redan finns
      const existingItemIndex = items.findIndex(
        (item) => item._id === productId
      );
      // Kontrollerar om produkten redan finns i varukorgen
      if (existingItemIndex > -1) {
        // Uppdaterar kvantiteten för befintlig produkt i varukorgen
        const updatedItems = items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        // Anropar 'updateCartItems' för att uppdatera varukorgslistan och spara i cookies
        updateCartItems(updatedItems);
        console.log("Varukorg uppdaterad:", items);
      } else {
        console.log("ny produkt läggs till i cart");
        // Lägger till en ny produkt i varukorgen om den inte redan finns
        const newCartItem = { ...product, quantity };
        const updatedItems = [...items, newCartItem];
        // Anropar 'updateCartItems' för att lägga till den nya produkten och spara i cookies
        updateCartItems(updatedItems);
      }
    } else {
      debugger;
      console.log("Produkten kunde inte hämtas.");
    }
  };

  const increaseQuantity = (productId: string) => {
    const newItems = items.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartItems(newItems);
  };

  const decreaseQuantity = (productId: string) => {
    const newItems = items.map((item) =>
      item._id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCartItems(newItems);
  };

  const removeFromCart = (productId: string) => {
    const newItems = items.filter((item) => item._id !== productId);
    updateCartItems(newItems);
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
