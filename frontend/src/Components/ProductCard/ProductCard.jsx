import { Link } from "react-router-dom";
import "./ProductCard.css";
import { useState, useEffect } from "react";
import AddToCart from "../AddToCart/AddToCart";
import { api } from "../../api";
import { getImageUrl } from "../../utils/imageHelper";

function ProductCard({ product, refreshWishlist }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkWishlistStatus();
  }, [product]);

  function checkWishlistStatus() {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return;

      const currentUser = JSON.parse(userStr);
      const wishlist = currentUser?.wishlist || [];

      const exists = wishlist.some(
        (item) => item?.productId?._id === product?._id
      );

      setIsInWishlist(exists);
    } catch (err) {
      console.error("Error checking wishlist:", err);
    }
  }

  async function handleWishlist() {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        alert("Please log in to manage your wishlist.");
        return;
      }

      const currentUser = JSON.parse(userStr);
      const email = currentUser?.email;
      if (!email) {
        alert("User session invalid. Please log in again.");
        return;
      }

      setLoading(true);

      const action = isInWishlist ? "remove" : "add";

      await api.post("/api/users/wishlist", {
        email,
        productId: product._id,
        action,
      });

      // Fetch updated wishlist
      const res = await api.get(`/api/users/wishlist/${email}`);

      // Update localStorage user object
      currentUser.wishlist = res.data.wishlist;
      localStorage.setItem("user", JSON.stringify(currentUser));

      setIsInWishlist(!isInWishlist);
      if (typeof refreshWishlist === "function") {
        refreshWishlist();
      }
    } catch (err) {
      console.error("❌ Wishlist update failed:", err);
      alert(
        err.response?.data?.message ||
          "Failed to update wishlist. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const productImage = getImageUrl(product?.image);

  return (
    <div className="product-card-container w-90 min-h-[385px]">
      <div className="product-card w-full h-full rounded-4xl hover:shadow-[0_0_20px_#ffffff6b] p-5 transition-all">
        <div className="image w-full h-70 bg-gray-200 rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover drop-shadow-[0_5px_5px_#444]"
            src={productImage}
            alt={product?.name || "Product"}
            onError={(e) => {
              e.target.src = "/images/placeholder.png";
            }}
          />
        </div>

        <div className="content">
          <h4 className="my-3 font-semibold text-lg truncate" title={product?.name}>
            {product?.name || "Unnamed Product"}
          </h4>

          <div className="flex justify-between items-center mb-3">
            <p className="font-bold text-xl">Rs {product?.price?.toLocaleString() || "0"}</p>
            <button
              className="cursor-pointer transition-transform hover:scale-110 disabled:opacity-50"
              onClick={handleWishlist}
              disabled={loading}
              title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <i
                className={`text-xl ${
                  isInWishlist
                    ? "fa-solid fa-heart text-red-500"
                    : "fa-regular fa-heart hover:text-red-500"
                }`}
              ></i>
            </button>
          </div>

          {(product?.flavor?.length > 0 || product?.weight) && (
            <div className="flavor-weight flex justify-between items-center py-1 pb-2 mb-2">
              {product?.flavor?.length > 0 && (
                <div className="text-xs p-1 border border-gray-400 rounded-md">
                  {product.flavor.join(", ")}
                </div>
              )}
              {product?.weight && (
                <p className="text-blue-500 text-sm font-medium">{product.weight}</p>
              )}
            </div>
          )}

          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
