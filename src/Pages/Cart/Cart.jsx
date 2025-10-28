import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartData, increaseQuantity, decreaseQuantity, removeCartItem } =
    useContext(CartContext);

  const totalPrice = cartData.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  return (
    <div className="flex justify-center items-start py-10 text-white px-4 md:px-0">
      <div className="w-full max-w-5xl bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row gap-8">

        {/* 🛒 Cart Items */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6 text-blue">Your Cart</h1>

          {cartData.length === 0 ? (
            <div className="text-center text-gray-600 mt-10">
              <i className="fa-solid fa-cart-shopping text-5xl mb-4 text-gray-400"></i>
              <p className="text-lg font-medium">Your cart is empty!</p>
            </div>
          ) : (
            cartData.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-700 py-4 gap-4"
              >
                {/* 🖼️ Product Info */}
                <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-auto">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover shadow-lg"
                  />
                  <div className="flex-1">
                    <h2 className="font-medium text-sm">{item?.name?.slice(0, 20)}...</h2>
                    <p className="text-green-300 font-medium text-md sm:text-lg">
                      Rs {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* 🔢 Quantity Controls */}
                <div className="flex items-center gap-2 sm:gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => decreaseQuantity(item.productId)}
                    className="bg-red-600 hover:bg-red-700 text-white w-12 h-12 sm:w-10 sm:h-10 rounded-full text-2xl sm:text-3xl flex justify-center items-center transition transform hover:scale-110"
                  >
                    −
                  </button>

                  <span className="font-bold text-lg w-8 sm:w-10 text-center">
                    {item.count}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.productId)}
                    className="bg-green-600 hover:bg-green-700 text-white w-10 h-10 sm:w-10 sm:h-10 rounded-full text-2xl sm:text-3xl flex justify-center items-center transition transform hover:scale-110"
                  >
                    +
                  </button>
                </div>

                {/* 💰 Total + Remove */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
                  <div className="font-semibold text-yellow-400 text-md sm:text-lg">
                    Rs. {(item.price * item.count).toLocaleString()}
                  </div>
                  <button
                    onClick={() => removeCartItem(item.productId)}
                    className="border border-blue-400 text-white px-3 py-1 sm:px-4 sm:py-1 rounded-lg hover:bg-blue-600 hover:text-white transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 📦 Order Summary */}
        {cartData.length > 0 && (
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

            <Link to='/checkout'>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4 sm:mt-6 py-2 sm:py-3 rounded-lg font-semibold transition">Checkout</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
