import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CartContext } from "@/Context/CartContext";
import toast from "react-hot-toast";
import getImageUrl from "@/utils/imageHelper";

const API_BASE = import.meta.env.VITE_API_BASE;

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedFlavor, setSelectedFlavor] = useState("");
    const [selectedServing, setSelectedServing] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${API_BASE}/products/${id}`);
                const data = await res.json();
                if (data.success) {
                    setProduct(data.product);
                    // Set default selections
                    if (data.product.flavor?.length > 0) {
                        setSelectedFlavor(data.product.flavor[0]);
                    }
                    if (data.product.servings?.length > 0) {
                        setSelectedServing(data.product.servings[0]);
                    }
                } else {
                    setError(data.error || "Product not found.");
                }
            } catch (err) {
                console.error("Failed to fetch product:", err);
                setError("Failed to load product details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const nextSlide = () =>
        setCurrentIndex((prev) => (prev + 1) % (product?.gallery?.length || 1));
    const prevSlide = () =>
        setCurrentIndex((prev) =>
            prev === 0 ? (product?.gallery?.length || 1) - 1 : prev - 1
        );

    function handleAddToCart() {
        const productToAdd = {
            ...product,
            flavor: selectedFlavor,
            servings: selectedServing,
        };
        addToCart(productToAdd);
        toast.success("Product added to cart!");
    }

    if (loading) return <div className="text-center text-white py-20">Loading product...</div>;
    if (error) return <div className="text-center text-red-500 py-20">{error}</div>;
    if (!product) return <div className="text-center text-white py-20">Product not found.</div>;

    return (
        <section className="flex flex-col lg:flex-row items-center justify-center text-white px-6 py-15 gap-12 max-w-7xl mx-auto">
            {/* Left: Image Slider */}
            <div className="w-full lg:w-1/2 flex flex-col items-center relative">
                <div className="bg-[#e5e7eb] relative w-full max-w-md overflow-hidden rounded-2xl">
                    <img
                        src={getImageUrl(product.gallery[currentIndex])}
                        alt={product.name}
                        className="w-full h-[400px] object-cover rounded-2xl border border-[#37b5fe]/40"
                    />

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 left-3 -translate-y-1/2 bg-[#37b5fe] p-2 rounded-full transition hover:scale-110"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 right-3 -translate-y-1/2 bg-[#37b5fe] p-2 rounded-full transition hover:scale-110"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Thumbnail Slider */}
                <div className="flex flex-wrap justify-center mt-4 gap-3">
                    {product.gallery.map((img, index) => (
                        <img
                            key={index}
                            src={getImageUrl(img)}
                            alt={`Thumbnail ${index}`}
                            onClick={() => setCurrentIndex(index)}
                            className={`bg-[#e5e7eb] w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition ${currentIndex === index
                                ? "border-[#37b5fe]"
                                : "border-transparent hover:border-[#37b5fe]/50"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Right: Product Details */}
            <div className="w-full lg:w-1/2 space-y-8">
                {/* Title */}
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#37b5fe] uppercase tracking-wide drop-shadow-[0_0_5px_#37b5fe70] leading-snug">
                    {product.name}
                </h1>

                {/* Info Boxes */}
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
                            {product.weight}
                        </p>
                    </div>
                    <div className="bg-white/5 hover:bg-white/10 transition-all p-4 rounded-xl border border-white/10">
                        <p className="text-gray-400 text-xs uppercase tracking-widest">
                            Price
                        </p>
                        <p className="font-semibold text-white text-base mt-1">
                            Rs. {product.price}
                        </p>
                    </div>
                </div>

                {/* Flavors Selection */}
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

                {/* Servings Selection */}
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

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 mt-10">
                    <button onClick={handleAddToCart} className="relative bg-[#37b5fe] text-black font-semibold px-6 py-2 sm:px-8 sm:py-3 rounded-xl overflow-hidden transition-all hover:scale-105 shadow-[0_0_15px_#37b5fe] group">
                        <span className="relative z-10">Add to Cart</span>
                        <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    </button>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-base sm:text-lg tracking-wide border-l-0 sm:border-l-4 border-[#37b5fe] pl-0 sm:pl-4">
                    {product.description}
                </p>
            </div>
        </section>
    );
};

export default ProductDetails;
