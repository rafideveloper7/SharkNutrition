import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

export default function AddToCart({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <button
      onClick={() => addToCart(product)}
      className="add-to-cart cursor-pointer bg-blue text-black rounded-md text-sm py-1 px-2 font-semibold hover:bg-blue-600 transition"
    >
      Add to cart
    </button>
  );
}
