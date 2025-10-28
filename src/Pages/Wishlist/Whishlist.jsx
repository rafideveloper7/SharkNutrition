import React, { useState } from "react";
import protein1 from '../../assets/protein1.png'

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([
    { id: 1, name: "T-Shirt", price: 2400, image: protein1 },
    { id: 2, name: "Chair", price: 3400, image: protein1 },
    { id: 3, name: "Table", price: 3600, image: protein1 },
    { id: 4, name: "Bag", price: 1800, image: protein1 },
  ]);

  const [message, setMessage] = useState("");

  const handleAddToCart = (id) => {
    const product = wishlist.find((item) => item.id === id);
    setMessage(`✅ "${product.name}" has been added to your cart!`);
    setTimeout(() => setMessage(""), 2500);
  };

  const handleRemove = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-start py-10 text-white px-4 md:px-0 relative">
      
      {/* Alert Box */}
      {message && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white text-gray-900 px-6 py-5 rounded-2xl shadow-2xl animate-fade-in-up w-[90%] max-w-md text-center border border-green-400">
            <h3 className="text-2xl font-bold text-green-600 mb-2">
              Product Added!
            </h3>
            <p className="text-gray-700 font-medium">{message}</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue text-center">
           Your Wishlist
        </h1>

        <div className="flex flex-col gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-700 pb-5 gap-4"
            >
              {/* Product Info */}
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

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-0 w-full sm:w-auto">
                <button
                  onClick={() => handleAddToCart(item.id)}
                  className="border border-green-400 text-green-400 px-4 py-2 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition w-full sm:w-auto text-center"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="border border-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition w-full sm:w-auto text-center"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {wishlist.length === 0 && (
            <p className="text-gray-400 text-center py-10 text-lg">
              Your wishlist is empty
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
