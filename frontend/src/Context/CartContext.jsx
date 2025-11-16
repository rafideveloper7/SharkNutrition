// src/Context/CartContext.jsx
import { createContext, useState } from "react";

export const CartContext = createContext(null);


export function ContextProvider({ children }) {
    const [cartData, setCartData] = useState([]);

    // Add product to cart
    // const addToCart = (product) => {
    //     setCartData((prev) => {
    //         const existingItem = prev.find(
    //             (item) => item.productId === product.productId
    //         );

    //         if (existingItem) {
    //             // Increase count if already in cart
    //             return prev.map((item) =>
    //                 item.productId === product.productId
    //                     ? { ...item, count: item.count + 1 }
    //                     : item
    //             );
    //         } else {
    //             // Add new product
    //             return [
    //                 ...prev,
    //                 {
    //                     productId: product?.productId,
    //                     name: product?.name,
    //                     price: product?.price,
    //                     count: 1,
    //                     image: product?.image,
    //                 },
    //             ];
    //         }
    //     });
    // };
const addToCart = (product) => {
    setCartData((prev) => {
        const existingItem = prev.find(
            (item) =>
                item.productId === product.productId &&
                item.servings === product.servings &&
                item.flavor === product.flavor 
        );

        if (existingItem) {
            // Increase count if same product + same flavor + same serving exists
            return prev.map((item) =>
                item.productId === product.productId &&
                item.servings === product.servings &&
                item.flavor === product.flavor
                    ? { ...item, count: item.count + 1 }
                    : item
            );
        } else {
            // Add new product item WITH servings & flavor
            return [
                ...prev,
                {
                    productId: product?.productId || product?._id,
                    name: product?.name,
                    price: product?.price,
                    count: 1,
                    image: product?.image,
                    servings: product?.servings,  //  ADDED
                    flavor: product?.flavor,      //  ADDED
                },
            ];
        }
    });
};

    // Increase quantity
    const increaseQuantity = (id) => {
        setCartData((prev) =>
            prev.map((item) =>
                item.productId === id ? { ...item, count: item.count + 1 } : item
            )
        );
    };

    //  Decrease quantity
    const decreaseQuantity = (id) => {
        setCartData((prev) =>
            prev
                .map((item) =>
                    item.productId === id
                        ? { ...item, count: Math.max(1, item.count - 1) }
                        : item
                )
                .filter((item) => item.count > 0)
        );
    };
const clearCart = () => {
    setCartData([]);
};

    //  Remove product from cart
    const removeCartItem = (id) => {
        setCartData((prev) => prev.filter((item) => item.productId !== id));
    };

    return (
        <CartContext.Provider
            value={{
                cartData,
                setCartData, 
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeCartItem,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
