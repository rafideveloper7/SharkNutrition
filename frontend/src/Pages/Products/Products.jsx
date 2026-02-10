import { useQuery } from "@tanstack/react-query";
import CategoryProducts from "../../Components/CategoryProducts/CategoryProducts";
import { loadProductsAndCategories } from "./loadProductsAndCategories";

function Products() {
  const {
    data: groups = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products-groups"],
    queryFn: loadProductsAndCategories,
    staleTime: 1000 * 60 * 5, // 5 min
    cacheTime: 1000 * 60 * 10, // 10 min
  });

  if (isLoading) {
    return (
      <section className="py-10 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Loading products...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-10 text-center">
        <p className="text-xl text-red-500 mb-4">
          {error?.message || "Failed to load data"}
        </p>
        <button
          onClick={refetch}
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
        <CategoryProducts key={group.catId} product={group} catId={group.catId} />
      ))}
    </section>
  );
}

export default Products;
