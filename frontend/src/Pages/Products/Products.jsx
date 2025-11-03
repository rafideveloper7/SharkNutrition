import React, { useEffect, useState } from "react";
import CategoryProducts from "../../Components/CategoryProducts/CategoryProducts";
import { fetchAllProducts } from "../../api";
import { toast } from "react-hot-toast";
function Products() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchAllProducts();
      console.log("🔍 API Response:", response);

      // Handle different API response formats
      let productArray = [];
      if (Array.isArray(response)) {
        productArray = response;
      } else if (response?.data && Array.isArray(response.data)) {
        productArray = response.data;
      } else if (response?.products && Array.isArray(response.products)) {
        productArray = response.products;
      }

      console.log("Product Array:", productArray);

      if (productArray.length === 0) {
        setError("No products available");
        setLoading(false);
        return;
      }

      const categoryMap = {};
      productArray.forEach((product) => {
        const category = product.category || "Uncategorized";

        if (!categoryMap[category]) {
          categoryMap[category] = [];
        }

        categoryMap[category].push(product);
      });

      const groupedArray = Object.keys(categoryMap).map(
        (categoryName, index) => ({
          catId: index + 1,
          category: categoryName,
          products: categoryMap[categoryName],
        })
      );

      console.log(" Grouped by category:", groupedArray);
      setGroups(groupedArray);
    } catch (err) {
      console.error(" Failed to load products:", err);
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="py-10 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Loading products...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 text-center">
        <p className="text-xl text-red-500 mb-4">{error}</p>
        <button
          onClick={loadProducts}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Try Again
        </button>
      </section>
    );
  }

  if (groups.length === 0) {
    return (
      <section className="py-10 text-center">
        <p className="text-xl text-gray-500">No products available</p>
      </section>
    );
  }

  const categoryOrder = ["protein", "creatine", "preworkout", "weightgainer"];
  const sortedGroups = [...groups].sort((a, b) => {
    const aIndex = categoryOrder.indexOf(
      a.category.toLowerCase().replace(/\s+/g, "")
    );
    const bIndex = categoryOrder.indexOf(
      b.category.toLowerCase().replace(/\s+/g, "")
    );

    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <section id="products" className="py-10">
      {sortedGroups.map((group) => (
        <CategoryProducts
          key={group.catId}
          product={group}
          catId={group.catId}
        />
      ))}
    </section>
  );
}

export default Products;
