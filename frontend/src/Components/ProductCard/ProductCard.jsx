import { Link } from "react-router-dom";
import "./ProductCard.css";
import { useState, useEffect } from "react";
import AddToCart from "../AddToCart/AddToCart";
import { api } from "../../api"; 

function ProductCard({ product, refreshWishlist }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Check if product is in wishlist on mount
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const isItemAvailable = currentUser?.wishlist?.some(
      (item) => item?.productId === product?._id
    );
    setIsInWishlist(!!isItemAvailable);
  }, [product]);

  // ✅ Handle wishlist toggle
  async function handleWishlist(product) {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentUser) return alert("Please log in to manage your wishlist.");

    try {
      setLoading(true);

      // Backend endpoint )
      const endpoint = `/users/${currentUser._id}/wishlist`;
      const action = isInWishlist ? "remove" : "add";

      const res = await api.post(endpoint, {
        productId: product._id,
        action,
      });

      // Update local user
      const updatedUser = res.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setIsInWishlist(!isInWishlist);
      if (typeof refreshWishlist === "function") refreshWishlist();
    } catch (err) {
      console.error("Wishlist update failed:", err);
      alert("Failed to update wishlist. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="product-card-container w-90 min-h-[385px]">
      <div className="product-card w-full h-full rounded-4xl hover:shadow-[0_0_20px_#ffffff6b] p-5">
        <div className="image w-full h-70 bg-[#ccc] rounded-lg">
          <img
            className="w-full h-full object-cover rounded-md drop-shadow-[0_5px_5px_#444]"
            src={product?.image}
            alt={product?.name}
          />
        </div>

        <div className="content">
          <h4 className="my-3">{product?.name}</h4>

          <div className="flex justify-between items-center mb-3">
            <p className="font-semibold">Rs {product?.price}</p>
            <button
              className="cursor-pointer"
              onClick={() => handleWishlist(product)}
              disabled={loading}
            >
              <i
                className={`${
                  isInWishlist
                    ? "fa-solid fa-heart text-red-500"
                    : "fa-regular fa-heart"
                }`}
              ></i>
            </button>
          </div>

          {(product?.flavor || product?.weight) && (
            <div className="flavor-weight flex justify-between items-center py-1 pb-2">
              <button
                className={`text-xs rounded-md border-gray-500 ${
                  product?.flavor && "p-1 border-1"
                }`}
              >
                {Array.isArray(product?.flavor)
                  ? product.flavor.join(", ")
                  : product?.flavor}
              </button>
              <p className="text-blue">{product?.weight}</p>
            </div>
          )}

          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
