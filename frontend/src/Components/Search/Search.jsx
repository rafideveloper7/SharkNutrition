import { useState, useEffect } from "react";
import { fetchAllProducts } from "../../api";
import ProductCard from "../ProductCard/ProductCard";
import './Search.css'

function Search({ setOpenSearch }) {
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const products = await fetchAllProducts();
        setAllProducts(products);
      } catch (err) {
        console.error("Failed to load products for search", err);
      }
    })();
  }, []);

  function handleSearch(e) {
    const searchValue = e.target.value.toLowerCase();
    setQuery(searchValue);

    if (searchValue.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const results = allProducts.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );

    setFilteredProducts(results);
  }

  return (
    <section
      id="search"
      className="fixed top-0 left-0 z-[1000] w-full h-full pt-10  px-5 overflow-y-auto"
    >
      <div className="search-content">
        <button
          className="absolute top-[3vw] right-[3vw] cursor-pointer text-white"
          onClick={() => setOpenSearch(false)}
        >
          <i className="fa-solid fa-xmark text-[1.5vw]"></i>
        </button>

        <div className="flex justify-center border-b border-[#aaa] max-w-[700px] mx-auto text-xl py-2">
          <input
            onChange={handleSearch}
            value={query}
            name="search"
            className="outline-none flex-1 py-2 placeholder-gray-400 bg-transparent text-white"
            placeholder="Type here..."
            type="text"
          />
          <button className="rounded-md text-sm p-2 cursor-pointer text-white">
            <i className="fa-solid fa-magnifying-glass text-xl"></i>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-2 container py-10 mb-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={`${item._id || item.productId}`} onClick={() => setOpenSearch(false)} product={item} />
          ))
        ) : query.length > 0 ? (
          <p className="text-center text-gray-400 col-span-full">
            No product found for "{query}"
          </p>
        ) : null}
      </div>
    </section>
  );
}

export default Search;
