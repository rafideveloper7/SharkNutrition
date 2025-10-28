import { useState } from "react";
import protein1 from '../../assets/protein1.png'

export default function Cart() {
  const [cartItem, setCartItem] = useState([
    { id: 1, name: "T-shirt", price: 2400, quantity: 1, image: protein1 },
    { id: 2, name: "Chair", price: 3400, quantity: 1, image: protein1 },
    { id: 3, name: "Table", price: 3600, quantity: 1, image: protein1 },
    { id: 4, name: "Bag", price: 1800, quantity: 1, image: protein1 },
  ]);

  const increaseQuantity = (id) => {
    setCartItem((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItem((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeCartItem = (id) => {
    setCartItem((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cartItem.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-start py-10 text-white px-4 md:px-0">
      <div className="w-full max-w-5xl bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row gap-8">
        
        {/* 🛒 Cart Items */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6 text-blue">Your Cart</h1>

          {cartItem.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-700 py-4 gap-4"
            >
              {/* 🖼️ Product Info */}
              <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover shadow-lg"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg sm:text-xl">{item.name}</h2>
                  <p className="text-green-300 font-medium text-md sm:text-lg">
                    Rs. {item.price.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* 🔢 Quantity Controls */}
              <div className="flex items-center gap-2 sm:gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white w-12 h-12 sm:w-10 sm:h-10 rounded-full text-2xl sm:text-3xl flex justify-center items-center transition transform hover:scale-110"
                >
                  −
                </button>

                <span className="font-bold text-lg w-8 sm:w-10 text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="bg-green-600 hover:bg-green-700 text-white w-10 h-10 sm:w-10 sm:h-10 rounded-full text-2xl sm:text-3xl flex justify-center items-center transition transform hover:scale-110"
                >
                  +
                </button>
              </div>

              {/* 💰 Total + Remove (Responsive) */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
                <div className="font-semibold text-yellow-400 text-md sm:text-lg">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </div>
                <button
                  onClick={() => removeCartItem(item.id)}
                  className="border border-blue-400 text-white px-3 py-1 sm:px-4 sm:py-1 rounded-lg hover:bg-blue-600 hover:text-white transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 📦 Order Summary */}
        <div className="w-full md:w-1/3 border border-gray-700 rounded-xl p-4 sm:p-6 bg-gray-900 mt-6 md:mt-0">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between text-md sm:text-lg font-medium mb-2">
            <span>Subtotal</span>
            <span>Rs. {totalPrice.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-lg sm:text-xl font-bold text-yellow-400 mt-4 border-t border-gray-700 pt-4">
            <span>Total</span>
            <span>Rs. {totalPrice.toLocaleString()}</span>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4 sm:mt-6 py-2 sm:py-3 rounded-lg font-semibold transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
