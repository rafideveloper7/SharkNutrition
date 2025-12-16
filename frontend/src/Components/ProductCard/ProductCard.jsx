import { Link } from "react-router-dom";
import "./ProductCard.css";
import { useState, useEffect } from "react";
import AddToCart from "../AddToCart/AddToCart";
import { api } from "../../api";
import { getImageUrl } from "../../utils/imageHelper";
import toast from "react-hot-toast";
import RatingInCard from "../RatingInCard/RatingInCard";

function ProductCard({ product, refreshWishlist }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkWishlistStatus();
  }, [product]);

  function checkWishlistStatus() {
    try {
      const userStr = localStorage.getItem("user");

      // =========================
      // 🚫 GUEST USER
      // =========================
      if (!userStr) {
        const guestWishlist = getGuestWishlist();

        const exists = guestWishlist.some(
          (item) => item?.productId?._id === product?._id
        );

        setIsInWishlist(exists);
        return;
      }

      // =========================
      // ✅ LOGGED-IN USER
      // =========================
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

  // Local Storage helper functions
  const GUEST_WISHLIST_KEY = "guest_wishlist";
  function getGuestWishlist() {
    const data = localStorage.getItem(GUEST_WISHLIST_KEY);
    return data ? JSON.parse(data) : [];
  }
  function saveGuestWishlist(wishlist) {
    localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(wishlist));
  }

  async function handleWishlist() {
    try {
      const userStr = localStorage.getItem("user");

      // =========================
      // 🚫 GUEST USER (NO LOGIN)
      // =========================
      if (!userStr) {
        let guestWishlist = getGuestWishlist();

        const exists = guestWishlist.find(
          (item) => item.productId._id === product._id
        );

        if (exists) {
          // remove
          guestWishlist = guestWishlist.filter(
            (item) => item.productId._id !== product._id
          );
          toast.success("Removed from wishlist");
          setIsInWishlist(false);
        } else {
          // add
          guestWishlist.push({
            _id: Date.now().toString(), // unique id
            productId: product,
          });
          toast.success("Added to wishlist");
          setIsInWishlist(true);
        }

        saveGuestWishlist(guestWishlist);

        if (typeof refreshWishlist === "function") {
          refreshWishlist();
        }

        return;
      }

      // =========================
      // ✅ LOGGED-IN USER
      // =========================
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
        isInWishlist ? "Removed from wishlist" : "Added to wishlist"
      );
    } catch (err) {
      console.error("Wishlist update failed:", err);
      toast.error(
        err.response?.data?.message ||
        "Failed to update wishlist. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const hasDiscount = product?.discountPercent && product.discountPercent > 0;
  const discountedPrice = hasDiscount
    ? Math.round(
      product?.price - (product?.price * product?.discountPercent) / 100
    )
    : product?.price;

  const productImage = getImageUrl(product?.image);
  const hasFlavorOrWeight = product?.flavor?.length > 0 || product?.weight;

  return (
    <div className="product-card-container">
      <div className="product-card">
        {/* Image Section */}
        <div className="image relative">
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
          <div className="absolute top-0 left-0 text-[10px] text-black font-bold flex text-white items-center gap-[1px]">
            {/* Discount Badge */}
            {hasDiscount > 0 && (
              <div className="absolute top-0 left-0 text-[10px] text-black font-bold flex text-white items-center gap-[1px]">
                <span className="bg-gray-500 rounded-full w-8 h-8 flex justify-center items-center">
                  {" "}
                  {product?.discountPercent}%
                </span>
              </div>
            )}
          </div>
          <div className="absolute top-0 right-0 flex justify-center items-center mt-2">
            <button
              className="wishlistbutton"
              onClick={handleWishlist}
              disabled={loading}
              title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <i
                className={`text-xl ${isInWishlist
                  ? "fa-solid fa-heart text-blue-500"
                  : "fa-regular fa-heart hover:text-blue-500"
                  }`}
              ></i>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="content">
          {/* Product Name */}
          <h4 className="product-name font-bold text-xl">
            <Link to={`/products/${product?._id}`}>
              {product?.name || "Unnamed Product"}
            </Link>
          </h4>

          <div className="flex justify-between items-center py-2">
            <p className="brand text-gray-400 text-xs">Optimum Nutrition</p>
            {product?.quantity <= 0 && (
              <p className="text-[9px] sm:text-xs min-w-fit relative border border-gray-300 px-1 sm:px-2 py-1 text-red-500 font-semibold rounded-md overflow-hidden">
                <span className="relative z-10">Out of stock</span>
              </p>
            )}
          </div>

          <RatingInCard
            rating={product?.ratings?.averageRating?.toFixed(1) || 0}
            reviews={product?.ratings?.totalRatings || 0}
          />

          {/* Price and Wishlist */}
          <div className="flex gap-5 items-center">
            {/* Price */}
            {hasDiscount ? (
              <div className="flex flex-col">
                <del className="text-gray-400 font-semibold">Rs {product?.price}</del>
                <strong className="text-blue-400 text-xl">
                  Rs {discountedPrice}
                </strong>
              </div>
            ) : (
              <strong className="ml-3 text-blue-400">
                Rs {product?.price}
              </strong>
            )}
          </div>
          <div className="flex justify-center mt-3">
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
