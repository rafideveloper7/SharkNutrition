import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import axios from "axios";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const userStr = localStorage.getItem("user");

      // =========================
      // 🚫 GUEST USER
      // =========================
      if (!userStr) {
        const guestWishlist = getGuestWishlist();
        setWishlist(guestWishlist);
        return;
      }

      // =========================
      // ✅ LOGGED-IN USER
      // =========================
      try {
        const currentUser = JSON.parse(userStr);
        if (!currentUser?.email) return;

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/users/wishlist/${currentUser.email}`
        );

        setWishlist(res.data.wishlist);
      } catch (err) {
        console.error("Failed to load wishlist:", err);
      }
    };

    fetchWishlist();
  }, []);

  // =========================
  // 🔄 REFRESH (after add/remove)
  // =========================
  const refreshWishlist = async () => {
    const userStr = localStorage.getItem("user");

    // guest refresh
    if (!userStr) {
      setWishlist(getGuestWishlist());
      return;
    }

    // logged-in refresh
    const currentUser = JSON.parse(userStr);
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE}/api/users/wishlist/${currentUser.email}`
    );
    setWishlist(res.data.wishlist);
  };

  return (
    <div className="flex justify-center items-start py-5 text-white px-4 md:px-0">
      <div className="w-full py-10 px-[2vw]">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue text-center">
          Your Wishlist
        </h1>

        {wishlist?.length > 0 ? (
          <div className="grid grid-cols-2 gap-[2vw] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {wishlist.map((item) => (
              <ProductCard
                key={item?.productId?._id || item?._id}
                product={item?.productId}
                refreshWishlist={refreshWishlist}
              />
            ))
            }
          </div>
        ) : (
          <p className="w-full text-gray-400 text-center py-10 text-lg text-center">
            Your wishlist is empty
          </p>
        )}
      </div>
    </div>
  );
}

// =========================
// Guest helpers
// =========================
const GUEST_WISHLIST_KEY = "guest_wishlist";

function getGuestWishlist() {
  const data = localStorage.getItem(GUEST_WISHLIST_KEY);
  return data ? JSON.parse(data) : [];
}
