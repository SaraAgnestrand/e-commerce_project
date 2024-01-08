import { PropsWithChildren, createContext, useState, useEffect } from "react";

export interface Product {
    _id: string,
    title: string,
    price: number,
    color: string,
    desription: string,
    img: string,
    inStock: number,
}

interface ProductContext {
    getProducts:() => void,
    products:Product[]
}

export const ProductContext = createContext<ProductContext>(null as any);

export function ProductProvider ({ children }: PropsWithChildren) {
     const [products, setProducts] = useState<Product[]>([]);
//Function that gets all products
    const getProducts = async () => {
        try {
            const res = await fetch (
                "http://localhost:3000/api/products"
            );

            const productData = await res.json();
            console.log("API Products:", productData); // Loggar produkterna från API
            setProducts(productData);
        } catch (error){
            console.log("API Error:", error);
        }
    }
    useEffect(() => {
        getProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ getProducts, products }}>
          {children}
        </ProductContext.Provider>
      );
    }