import React, { useEffect, useState } from "react";
import CategoryProducts from "../../Components/CategoryProducts/CategoryProducts";
import { fetchAllProducts } from "../../api";
function Products() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      // Fetch products and categories in parallel
      const [productsResponse, categoriesResponse] = await Promise.all([
        fetchAllProducts(),
        fetch(`${import.meta.env.VITE_API_BASE}/api/categories`).then((res) => res.json())
      ]);

      // Handle different API response formats
      let productArray = [];
      if (Array.isArray(productsResponse)) {
        productArray = productsResponse;
      } else if (productsResponse?.data && Array.isArray(productsResponse.data)) {
        productArray = productsResponse.data;
      } else if (productsResponse?.products && Array.isArray(productsResponse.products)) {
        productArray = productsResponse.products;
      }


      if (productArray.length === 0) {
        setError("No products available");
        setLoading(false);
        return;
      }

      // Handle categories for sorting
      const categories = categoriesResponse.categories || [];
      
      // Sort categories by sliderOrder (ascending)
      categories.sort((a, b) => {
        const orderA = (a.sliderOrder !== undefined && a.sliderOrder !== null) ? a.sliderOrder : 9999;
        const orderB = (b.sliderOrder !== undefined && b.sliderOrder !== null) ? b.sliderOrder : 9999;
        return orderA - orderB;
      });

      // Create a map for order index
      const categoryOrderMap = {};
      categories.forEach((cat, index) => {
        categoryOrderMap[cat.name.toLowerCase().trim()] = index;
      });

      // Group products by category
      const categoryMap = {};
      productArray.forEach((product) => {
        const categoryKey = product.category ? product.category.toLowerCase().trim() : "uncategorized";

        if (!categoryMap[categoryKey]) {
          categoryMap[categoryKey] = [];
        }

        categoryMap[categoryKey].push(product);
      });

      // Create groups array
      const groupedArray = Object.keys(categoryMap).map((key, index) => {
        // Find proper display name from categories list if available
        const matchedCategory = categories.find(c => c.name.toLowerCase().trim() === key);
        const displayName = matchedCategory ? matchedCategory.name : key.charAt(0).toUpperCase() + key.slice(1);

        return {
          catId: index + 1,
          category: displayName,
          products: categoryMap[key],
          sortIndex: categoryOrderMap[key] !== undefined ? categoryOrderMap[key] : 9999
        };
      });

      // Sort groups based on the order map
      groupedArray.sort((a, b) => a.sortIndex - b.sortIndex);

      setGroups(groupedArray);
    } catch (err) {
      console.error(" Failed to load data:", err);
      setError(err.message || "Failed to load data");
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
          onClick={loadData}
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

  return (
    <section id="products" className="py-10">
      {groups.map((group) => (
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
