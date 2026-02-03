import "./Categories.css";
import ScrollContainer from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import { useState, useEffect } from "react";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/categories/slider/home`);
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  if (categories.length === 0) return null;

  return (
    <section id="categories" className="py-10">
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
              href={`#${item?.name?.toLowerCase().replace(/\s+/g, '-')}`}
              key={item?._id || index}
              className="category-item flex-shrink-0"
            >
              <div className="text-center">
                <div className="image w-[10vw] min-w-[100px] h-[10vw] min-h-[100px] bg-[#bbb] rounded-full mb-5">
                  <img
                    className="w-full h-full object-cover rounded-full drop-shadow-[0_5px_5px_#444]"
                    src={item?.image}
                    alt={item?.name}
                    onError={(e) => {
                      e.target.src = "/images/placeholder.png";
                    }}
                  />
                </div>
                <h3 className="font-semibold">
                  {item?.name?.toUpperCase()}
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