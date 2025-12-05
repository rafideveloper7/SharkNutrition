// src/Context/CartContext.jsx
import { createContext, useState } from "react";
import { toast } from "react-hot-toast";

export const CartContext = createContext(null);

export function ContextProvider({ children }) {
  const [cartData, setCartData] = useState([]);

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
            discountedPrice: product?.discountedPrice || product?.price,
            count: 1,
            image: product?.image,
            servings: product?.servings,
            flavor: product?.flavor,
            quantity: product?.quantity || 0,
          },
        ];
      }
    });
  };

  const increaseQuantity = (id) => {
    setCartData((prev) =>
      prev.map((item) => {
        if (item.productId === id) {
          if (item.count >= item.quantity) {
            toast.error(`Only ${item.quantity} item(s) available in stock!`, {
              id: "stock-error",
            });
            return item;
          }
          return { ...item, count: item.count + 1 };
        }
        return item;
      })
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
