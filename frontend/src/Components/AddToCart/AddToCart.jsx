import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function AddToCart({ product }) {
  const { addToCart } = useContext(CartContext);

  function handleAddToCart() {
    const userStr = localStorage.getItem("user");
    addToCart({
      ...product,
      flavor: "Not Selected",
      servings: "Not Selected",
      discountedPrice: product?.discountPercent
        ? Math.round(product?.price - (product?.price * product?.discountPercent) / 100)
        : product?.price,
    });
    toast.success("Product added to cart!");
  }

  return (
    <button
      onClick={handleAddToCart}
      className="add-to-cart cursor-pointer mx-auto bg-blue text-black rounded-sm text-sm py-3 px-5 font-semibold hover:bg-blue-600 transition"
    >
      Add to cart
    </button>
  );
}