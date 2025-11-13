import { useContext, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import product1 from "../../assets/2.png";
import product2 from "../../assets/3.png";
import product3 from "../../assets/4.png";
import product4 from "../../assets/5.png";
import { CartContext } from "@/Context/CartContext";
import toast from "react-hot-toast";

const ProductDetails = () => {
    const product = {
        name: "Dynamic Multi Vitamin",
        description:
            "A powerful blend of vitamins, minerals, and essential nutrients designed to boost immunity, enhance recovery, and support overall performance.",
        category: "Vitamins & Supplements",
        images: [product1, product2, product3, product4],

        // Multiple Options
        flavors: ["Chocolate Thunder", "Vanilla Blast", "Strawberry Storm"],
        servings: ["30 Servings", "60 Servings", "90 Servings"],
        weight: "2.5 KG",
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0]);
    const [selectedServing, setSelectedServing] = useState(product.servings[0]);

    const nextSlide = () =>
        setCurrentIndex((prev) => (prev + 1) % product.images.length);
    const prevSlide = () =>
        setCurrentIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );

    const { addToCart } = useContext(CartContext);
    function handleAddToCart() {
        const userStr = localStorage.getItem("user");
        addToCart(product);
        toast.success("Product added to cart!");
    }

    return (
        <section className="flex flex-col lg:flex-row items-center justify-center text-white px-6 py-15 gap-12 max-w-7xl mx-auto">
            {/* Left: Image Slider */}
            <div className="w-full lg:w-1/2 flex flex-col items-center relative">
                <div className="bg-[#e5e7eb] relative w-full max-w-md overflow-hidden rounded-2xl">
                    <img
                        src={product.images[currentIndex]}
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
                    {product.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
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
                </div>

                {/* Flavors Selection */}
                <div>
                    <p className="text-gray-400 text-sm uppercase mb-2 tracking-widest">
                        Select Flavor
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {product.flavors.map((flavor) => (
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
                    <button onClick={handleAddToCart} className="relative bg-[#37b5fe] text-black font-semibold px-10 py-3 rounded-xl overflow-hidden transition-all hover:scale-105 shadow-[0_0_15px_#37b5fe] group">
                        <span className="relative z-10">Add to Cart</span>
                        <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    </button>
                </div>

                {/* Divider */}
                <div className="mt-12 border-t border-white/10 w-3/4"></div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-base sm:text-lg tracking-wide border-l-4 border-[#37b5fe] pl-3 sm:pl-4">
                    {product.description}
                </p>
            </div>
        </section>
    );
};

export default ProductDetails;
