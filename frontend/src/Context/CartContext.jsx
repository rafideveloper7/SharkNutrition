// src/Context/CartContext.jsx
import { createContext, useState } from "react";
import { toast } from "react-hot-toast";

export const CartContext = createContext(null);

export function ContextProvider({ children }) {
  const [cartData, setCartData] = useState([]);

 

const addToCart = (product) => {
  let added = false;

  setCartData((prev) => {
    const existingItem = prev.find(
      (item) =>
      item._id === product._id && 
        item.servings === product.servings &&
        item.flavor === product.flavor
    );

    const stockQty = product.quantity || 0;

    if (existingItem) {
      if (existingItem.count + 1 > stockQty) {
        toast.error(`Only ${stockQty} item(s) available in stock!`);
        return prev;
      }
      added = true;
      return prev.map((item) =>
         item._id === product._id && 
        item.servings === product.servings &&
        item.flavor === product.flavor
          ? { ...item, count: item.count + 1 }
          : item
      );
    }

    if (stockQty <= 0) {
      toast.error("Product is out of stock!");
      return prev;
    }

    added = true;
    return [
      ...prev,
      {
        _id: product._id, 
        productId: product.productId, 
        name: product?.name,
        price: product?.price,
        discountedPrice: product?.discountedPrice || product?.price,
        count: 1,
        image: product?.image,
        servings: product?.servings,
        flavor: product?.flavor,
        quantity: stockQty,
      },
    ];
  });

  return { added }; 
};



  const increaseQuantity = (id) => {
    setCartData((prev) =>
      prev.map((item) => {
       if (item._id === id) { 
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
              item._id === id  
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
   setCartData((prev) => prev.filter((item) => item._id !== id)); 
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
