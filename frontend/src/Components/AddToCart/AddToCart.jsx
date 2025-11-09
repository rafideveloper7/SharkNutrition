import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function AddToCart({ product }) {
  const { addToCart } = useContext(CartContext);

  function handleAddToCart() {
    const userStr = localStorage.getItem("user");
    addToCart(product);
     toast.success("Product added to cart!");
  }

  return (
    <button
      onClick={handleAddToCart}
      className="add-to-cart cursor-pointer bg-blue text-black rounded-md text-sm py-1 px-2 font-semibold hover:bg-blue-600 transition"
    >
      Add to cart
    </button>
  );
}


