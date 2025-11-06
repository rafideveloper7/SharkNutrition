import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import axios from "axios";
const backendApi = import.meta.env.VITE_API_BASE

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlistFromBackend = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (!currentUser?.email) return;

        const res = await axios.get(
          `${backendApi}/api/users/wishlist/${currentUser.email}`
        );
        setWishlist(res.data.wishlist);
      } catch (err) {
        console.error(" Failed to load wishlist:", err);
      }
    };

    fetchWishlistFromBackend();
  }, []);

  const refreshWishlist = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const res = await axios.get(
      `${backendApi}/api/users/wishlist/${currentUser.email}`
    );
    setWishlist(res.data.wishlist);
  };

  return (
    <div className="flex justify-center items-start py-5 text-white px-4 md:px-0 relative">
      <div className="w-full p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue text-center">
          Your Wishlist
        </h1>

        <div className="flex flex-wrap gap-10 justify-center">
          {wishlist?.length > 0 ? (
            wishlist.map((item) => (
              <ProductCard
                key={item.productId._id}
                product={item.productId}
                refreshWishlist={refreshWishlist}
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
