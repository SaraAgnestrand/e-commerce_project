import React, { createContext, useContext, useState, PropsWithChildren } from "react";
import Cookies from "js-cookie";
import { Product } from "./ProductContext"; 

// Definierar en utvidgning av Product-typen för att inkludera kvantitetexport 
interface CartItem extends Product {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
}


export const CartContext = createContext<Cart | undefined>(undefined);

export const CartProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const cartCookie = Cookies.get('cart');

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
    Cookies.set('cart', JSON.stringify(newItems), { sameSite: 'strict'});
  };

  const fetchProduct = async (productId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${productId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Fetch Error:", error);
      return null;
    }
  };
// Definierar en asynkron funktion 'addToCart' för att lägga till produkter i varukorgen
const addToCart = async (productId: string, quantity: number) => {
  // Anropar 'fetchProduct' för att hämta detaljer om den önskade produkten med hjälp av dess ID
  const product = await fetchProduct(productId);

  // Kontrollerar om produktinformationen hämtades framgångsrikt
  if (product) {
    // Söker igenom den nuvarande varukorgslistan för att se om produkten redan finns
    const existingItemIndex = items.findIndex(item => item._id === productId);
    // Kontrollerar om produkten redan finns i varukorgen
    if (existingItemIndex > -1) {
      // Uppdaterar kvantiteten för befintlig produkt i varukorgen
      const updatedItems = items.map((item, index) => 
        index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item
      );
      // Anropar 'updateCartItems' för att uppdatera varukorgslistan och spara i cookies
      updateCartItems(updatedItems);
      console.log("Varukorg uppdaterad:", items);
    } else {
      console.log("Produkten kunde inte hämtas.");
      // Lägger till en ny produkt i varukorgen om den inte redan finns
      const newCartItem = { ...product, quantity };
      const updatedItems = [...items, newCartItem];
      // Anropar 'updateCartItems' för att lägga till den nya produkten och spara i cookies
      updateCartItems(updatedItems);
    }
  } else {
    // Skriver ut ett felmeddelande om produkten inte kunde hämtas
    console.log("Produkten kunde inte hämtas.");
  }
};

// Returnerar CartContext.Provider för att göra varukorgsdata och 'addToCart'-funktionen tillgänglig
// för alla barnkomponenter inom denna kontext
return (
  <CartContext.Provider value={{ items, addToCart }}>
    {children}
  </CartContext.Provider>
);
};

export default CartProvider;

 