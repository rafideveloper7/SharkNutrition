import { fetchAllProducts } from "@/api";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

function SimilarProducts({ category }) {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [apiCalled, setApiCalled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const similarRef = useRef(null);

    // Fetch products
    async function getProductsByCategory() {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetchAllProducts();
            let products = [];

            if (Array.isArray(response)) products = response;
            else if (response?.data) products = response.data;
            else if (response?.products) products = response.products;

            setAllProducts(products);
        } catch (err) {
            console.error(err);
            setError("Failed to load products");
        } finally {
            setIsLoading(false);
        }
    }

    // Intersection Observer
    useEffect(() => {
        if (apiCalled) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    getProductsByCategory();
                    setApiCalled(true);
                    observer.disconnect();
                }
            },
            {
                root: null,
                rootMargin: "0px 0px 100px 0px",
                threshold: 0,
            }
        );

        if (similarRef.current) {
            observer.observe(similarRef.current);
        }

        return () => observer.disconnect();
    }, [apiCalled]);

    // Filter by category
    useEffect(() => {
        if (!category || allProducts.length === 0) return;

        const filtered = allProducts.filter(
            (item) => item.category === category
        );

        setFilteredProducts(filtered);
    }, [category, allProducts]);

    return (
        <section
            id="similar-products"
            ref={similarRef}
            className="px-2 sm:px-0 py-10"
        >
            <h3 className="text-xl font-medium mb-5">
                {apiCalled && filteredProducts.length < 10 ? "" : "You may also like"}
            </h3>

            {/* Loading */}
            {isLoading && (
                <div className="py-10 text-center">
                    <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-500 mx-auto mb-3"></div>
                    <p className="text-gray-600">Loading products...</p>
                </div>
            )}

            {/* Error */}
            {error && !isLoading && (
                <div className="py-10 text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={() => {
                            getProductsByCategory();
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Refresh
                    </button>
                </div>
            )}

            {/* Products */}
            {!isLoading && !error && filteredProducts.length >= 10 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.slice(-8).map((item, index) => (
                        <ProductCard
                            key={item?._id || `${category}-${index}`}
                            product={item}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default SimilarProducts;
