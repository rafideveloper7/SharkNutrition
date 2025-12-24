import { useContext, useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, X, ZoomIn } from "lucide-react";
import { CartContext } from "@/Context/CartContext";
import toast from "react-hot-toast";
import getImageUrl from "@/utils/imageHelper";
import ReviewSection from "@/Components/ReviewSection/ReviewSection";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ProductImageSlider from "./ProductImageSlider";
import "./ProductDetails.css"

const API_BASE = import.meta.env.VITE_API_BASE;

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, cartData } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedServing, setSelectedServing] = useState("");

  // for scroll into reviews
  const reviewsRef = useRef(null);
  const hasScrolled = useRef(false);
  const location = useLocation();
  useEffect(() => {
    if (reviews.length === 0) return; // wait until reviews are loaded
    if (location.hash !== "#reviews") return;
    if (!reviewsRef.current) return;
    if (hasScrolled.current) return;

    hasScrolled.current = true;

    // wait for DOM to fully paint
    requestAnimationFrame(() => {
      reviewsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [reviews, location.hash]);

  // Fetch product and reviews
  useEffect(() => {
    const fetchProductAndReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch product details
        const resProduct = await fetch(`${API_BASE}/products/${id}`);
        const dataProduct = await resProduct.json();
        if (!dataProduct.success)
          throw new Error(dataProduct.error || "Product not found");
        setProduct(dataProduct.product);

        // Set default selections
        if (dataProduct.product.flavor?.length > 0)
          setSelectedFlavor(dataProduct.product.flavor[0]);
        if (dataProduct.product.servings?.length > 0)
          setSelectedServing(dataProduct.product.servings[0]);

        // Fetch reviews
        const resReviews = await fetch(`${API_BASE}/api/reviews/${id}`);
        const dataReviews = await resReviews.json();
        if (dataReviews.success) setReviews(dataReviews.reviews);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndReviews();
  }, [id]);

  const handleAddToCart = () => {
    const result = addToCart({
      ...product,
      productId: product._id,
      flavor: selectedFlavor,
      servings: selectedServing,
      discountedPrice: product.discountPercent
        ? Math.round(product.price - (product.price * product.discountPercent) / 100)
        : product.price,
    });

    // Show success toast only if product was added
    if (result?.added) {
      toast.success("Product added to cart!");
    }
  };


  if (loading) {
    return <div className="text-center text-white py-20">Loading product...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-20">{error}</div>;
  }

  if (!product) {
    return <div className="text-center text-white py-20">Product not found.</div>;
  }

  console.log(product?.servings)
  return (
    <>
      <section className="flex flex-col lg:flex-row justify-center text-white px-6 py-15 gap-12 max-w-7xl mx-auto">
        {/* Left: Image Slider */}
        <ProductImageSlider product={product} />

        {/* Right: Product Details */}
        <div className="w-full lg:w-1/2 space-y-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#37b5fe] m-0 uppercase tracking-wide drop-shadow-[0_0_5px_#37b5fe70] leading-snug">
            {product.name}
          </h1>
          <h3 className="font-semibold text-md">{product.brandName || ""}</h3>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 mt-6 text-sm">
            <div className="bg-white/5 hover:bg-white/10 transition-all p-4 rounded-xl border border-white/10">
              <p className="text-gray-400 text-xs uppercase tracking-widest">
                Category
              </p>
              <p className="font-semibold text-white text-base mt-1">
                {product.category}
              </p>
            </div>
            <div className="bg-white/5 hover:bg-white/10 transition-all p-4 rounded-xl border border-white/10">
              <p className="text-gray-400 text-xs uppercase tracking-widest">
                Weight
              </p>
              <p className="font-semibold text-white text-base mt-1">
                {product.weight || "N/A"}
              </p>
            </div>
            <div className="bg-white/5 hover:bg-white/10 transition-all p-4 rounded-xl border border-white/10">
              <p className="text-gray-400 text-xs uppercase tracking-widest">
                Price
              </p>
              <p className="font-semibold text-white text-base mt-1">
                Rs. {product.discountedPrice || product.price}
                {product.discountPercent > 0 && (
                  <del className="text-gray-400 ms-3 font-normal">
                    {product.price}
                  </del>
                )}
              </p>
            </div>
            <div className="bg-white/5 hover:bg-white/10 transition-all p-4 rounded-xl border border-white/10">
              <p className="text-gray-400 text-xs uppercase tracking-widest">
                Ratings
              </p>
              <p className="font-semibold text-white text-base mt-1 flex gap-2 items-center">
                <Star className="w-5 fill-yellow-400 stroke-yellow-400" />
                {/* {product.ratings?.averageRating?.toFixed(1) || 0} ({product.ratings?.totalRatings || 0}) */}
                {product.ratings?.averageRating?.toFixed(1) || 0}
              </p>
            </div>
          </div>

          {/* Flavors */}
          {
            product?.flavor[0] &&
            <div>
              <p className="text-gray-400 text-sm uppercase mb-2 tracking-widest">
                Select Flavor
              </p>
              <div className="flex flex-wrap gap-3">
                {product.flavor.map((flavor) => (
                  <button
                    key={flavor}
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`px-4 py-2 rounded-lg border transition-all text-sm font-medium ${selectedFlavor === flavor
                      ? "border-[#37b5fe] bg-[#37b5fe]/10 text-white shadow-[0_0_8px_#37b5fe50]"
                      : "border-gray-700 text-gray-300 hover:border-[#37b5fe] hover:text-[#37b5fe]"
                      }`}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>
          }

          {/* Servings */}
          {
            product?.servings[0] &&
            <div>
              <p className="text-gray-400 text-sm uppercase mb-2 tracking-widest">
                Select Servings
              </p>
              <div className="flex flex-wrap gap-3">
                {product.servings.map((serving) => (
                  <button
                    key={serving}
                    onClick={() => setSelectedServing(serving)}
                    className={`px-4 py-2 rounded-lg border transition-all text-sm font-medium ${selectedServing === serving
                      ? "border-[#37b5fe] bg-[#37b5fe]/10 text-white shadow-[0_0_8px_#37b5fe50]"
                      : "border-gray-700 text-gray-300 hover:border-[#37b5fe] hover:text-[#37b5fe]"
                      }`}
                  >
                    {serving}
                  </button>
                ))}
              </div>
            </div>
          }

          {/* CTA Button */}
          <div className="flex flex-wrap items-center gap-4 mt-10">
            {product.quantity > 0 ? (
              <button
                onClick={handleAddToCart}
                className="relative bg-[#37b5fe] text-black font-semibold px-6 py-2 sm:px-8 sm:py-3 rounded-xl overflow-hidden transition-all hover:scale-105 shadow-[0_0_15px_#37b5fe] group"
              >
                <span className="relative z-10">Add to Cart</span>
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              </button>
            ) : (
              <p className="border border-gray-400 rounded-lg py-2 px-3 text-center text-red-500 text-bold mt-2">
                Out of stock
              </p>
            )}
          </div>

          <p className="text-gray-300 leading-relaxed text-base sm:text-lg tracking-wide border-l-0 sm:border-l-4 border-[#37b5fe] pl-0 sm:pl-4">
            {product.description}
          </p>
        </div>
      </section>

      {/* Reviews */}
      <ReviewSection
        ref={reviewsRef}
        reviews={reviews}
        productId={id}
        onReviewAdded={(updatedProduct) => setProduct(updatedProduct)}
      />
    </>
  );
};

export default ProductDetails;
