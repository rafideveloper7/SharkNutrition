import "./Categories.css";
import ScrollContainer from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import { useState, useEffect } from "react";
import { fetchAllProducts } from "../../api";
import { getImageUrl } from "../../utils/imageHelper";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const products = await fetchAllProducts();

        const categoryMap = {};
        products.forEach((p) => {
          const cat = p.category || "Uncategorized";
          if (!categoryMap[cat]) {
            categoryMap[cat] = {
              category: cat,
              image: p.image || "",
            };
          }
        });

        setCategories(Object.values(categoryMap));
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <section id="categories" className="py-10 px-5">
        <h2 className="text-3xl text-center font-medium pb-5">
          SHOP BY CATEGORIES
        </h2>
        <p className="text-center">Loading categories...</p>
      </section>
    );
  }

  return (
    <section id="categories" className="py-10 px-5">
      <h2 className="text-3xl text-center font-medium pb-5">
        SHOP BY CATEGORIES
      </h2>
      <ScrollContainer
        className="category-items"
        vertical={false}
        horizontal={true}
        hideScrollbars={true}
      >
        <div className="category-items-inner flex gap-[5vw] py-5 px-5">
          {categories?.map((item, index) => (
            <a
              href={`#${item?.category.toLowerCase().replace(/\s+/g, "-")}`}
              key={index}
              className="category-item flex-shrink-0"
            >
              <div className="text-center">
                <div className="image w-[10vw] min-w-[100px] h-[10vw] min-h-[100px] bg-[#bbb] rounded-full mb-5">
                  <img
                    className="w-full h-full object-cover rounded-full drop-shadow-[0_5px_5px_#444]"
                    src={getImageUrl(item?.image)}
                    alt={item?.category}
                    onError={(e) => {
                      e.target.src = "/images/placeholder.png";
                    }}
                  />
                </div>
                <h3 className="whitespace-nowrap">
                  {item?.category.charAt(0).toUpperCase() +
                    item?.category.slice(1)}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </ScrollContainer>
    </section>
  );
}

export default Categories;