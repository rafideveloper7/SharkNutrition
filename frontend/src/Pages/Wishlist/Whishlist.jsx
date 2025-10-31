import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");

  // Load wishlist from localStorage initially
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    setWishlist(currentUser?.wishlist || []);
  }, []);

  // Sync wishlist when localStorage updates (after ProductCard changes)
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setWishlist(updatedUser?.wishlist || []);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Custom function to manually refresh wishlist after remove/add
  const refreshWishlist = () => {
    const updatedUser = JSON.parse(localStorage.getItem("user"));
    setWishlist(updatedUser?.wishlist || []);
  };

  return (
    <div className="flex justify-center items-start py-5 text-white px-4 md:px-0 relative">
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

      <div className="w-full p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue text-center">
          Your Wishlist
        </h1>

        {/* Wishlist Products */}
        <div className="flex flex-wrap gap-10 justify-center">
          {wishlist?.length > 0 ? (
            wishlist.map((product) => (
              <ProductCard
                key={product?.productId}
                product={product}
                refreshWishlist={refreshWishlist} // <-- add this
              />
            ))
          ) : (
            <p className="text-gray-400 text-center py-10 text-lg">
              Your wishlist is empty
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
