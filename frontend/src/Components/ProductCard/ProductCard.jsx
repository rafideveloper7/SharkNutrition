import { Link } from "react-router-dom";
import "./ProductCard.css";
import { useState, useEffect } from "react";
import AddToCart from "../AddToCart/AddToCart";
import { api } from "../../api";
import { getImageUrl } from "../../utils/imageHelper";
import toast from "react-hot-toast";

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
        isInWishlist ? "Removed from wishlist ❤️" : "Added to wishlist ❤️"
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
  const hasFlavorOrWeight = product?.flavor?.length > 0 || product?.weight;

  return (
      <div className="product-card-container">
        <div className="product-card">
          {/* Image Section */}
          <div className="image">
            <Link to={`/products/${product?._id}`}>
              <img
                className="w-full h-full object-cover"
                src={productImage}
                alt={product?.name || "Product"}
                onError={(e) => {
                  e.target.src = "/images/placeholder.png";
                }}
              />
            </Link>
          </div>

          {/* Content Section */}
          <div className="content">
            {/* Product Name */}
            <h4 className="product-name">
              <Link to={`/products/${product?._id}`}>
                {product?.name || "Unnamed Product"}
              </Link>
            </h4>

            {/* Price and Wishlist */}
            <div className="price-row">
              <p className="price">
                Rs {product?.price?.toLocaleString() || "0"}
              </p>

              <button
                className="wishlistbutton"
                onClick={handleWishlist}
                disabled={loading}
                title={
                  isInWishlist ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <i
                  className={`text-xl ${
                    isInWishlist
                      ? "fa-solid fa-heart text-blue-500"
                      : "fa-regular fa-heart hover:text-blue-500"
                  }`}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProductCard;
