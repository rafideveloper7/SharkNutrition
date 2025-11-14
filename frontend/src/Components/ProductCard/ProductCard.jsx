import { Link } from "react-router-dom";
import "./ProductCard.css";
import { useState, useEffect } from "react";
import AddToCart from "../AddToCart/AddToCart";
import { api } from "../../api";
import { getImageUrl } from "../../utils/imageHelper";
import toast from "react-hot-toast"; // ✅ added

function ProductCard({ product, refreshWishlist }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkWishlistStatus();
  }, [product]);

  // ✅ check if product already exists in wishlist
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

  // ✅ handle add/remove wishlist
  async function handleWishlist() {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        toast.error("Please log in to manage your wishlist!");
        return;
      }

      const currentUser = JSON.parse(userStr);
      const email = currentUser?.email;
      if (!email) {
        toast.error("User session invalid. Please log in again!");
        return;
      }

      setLoading(true);
      const action = isInWishlist ? "remove" : "add";

      const response = await api.post("/api/users/wishlist", {
        email,
        productId: product._id,
        action,
      });

      if (response.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        const res = await api.get(`/api/users/wishlist/${email}`);
        currentUser.wishlist = res.data.wishlist;
        localStorage.setItem("user", JSON.stringify(currentUser));
      }

      setIsInWishlist(!isInWishlist);

      if (typeof refreshWishlist === "function") {
        refreshWishlist();
      }

      toast.success(
        isInWishlist
          ? "Removed from wishlist ❤️"
          : "Added to wishlist ❤️"
      );
    } catch (err) {
      console.error("❌ Wishlist update failed:", err);
      toast.error(
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
          <Link to={`/products/${product?._id}`}>
            <img
              className="w-full h-full object-cover drop-shadow-[0_5px_5px_#444]"
              src={productImage}
              alt={product?.name || "Product"}
              onError={(e) => {
                e.target.src = "/images/placeholder.png";
              }}
            />
          </Link>
        </div>

        <div className="content">
          <h4
            className="my-3 font-semibold text-lg truncate"
            title={product?.name}
          >
            <Link to={`/products/${product?._id}`}>
              {product?.name || "Unnamed Product"}
            </Link>
          </h4>

          <div className="flex justify-between items-center mb-3">
            <p className="font-bold text-xl">
              Rs {product?.price?.toLocaleString() || "0"}
            </p>

            {/* ❤️ wishlist button */}
            <button
              className="cursor-pointer transition-transform hover:scale-110 disabled:opacity-50"
              onClick={handleWishlist}
              disabled={loading}
              title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <i
                className={`text-xl ${isInWishlist
                  ? "fa-solid fa-heart text-red-500"
                  : "fa-regular fa-heart hover:text-red-500"
                  }`}
              ></i>
            </button>
          </div>

          {(product?.flavor?.length > 0 || product?.weight) && (
            <div className="flavor-weight flex justify-between items-center py-1 pb-2 mb-2">
              {product?.flavor?.filter(f => f.trim() !== "").length > 0 && (
                <div className="text-xs p-1 border border-gray-400 rounded-md">
                  {product.flavor.filter(f => f.trim() !== "").join(", ")}
                </div>
              )}
              {product?.flavor?.filter(f => f.trim() !== "").length === 0 && (
                <div className="text-xs p-1 rounded-md">
                </div>
              )}
              {product?.weight && (
                <p className="text-blue-500 text-sm font-medium">
                  {product.weight}
                </p>
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
