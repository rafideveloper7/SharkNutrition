import "./Categories.css";
import ScrollContainer from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import { useState } from "react";
// Images
import proteinImg from "../../assets/categories/PROTEIN.png";
import massGainerImg from "../../assets/categories/MASS-GAINER.png";
import creatineImg from "../../assets/categories/CREATINE.png";
import preworkoutImg from "../../assets/categories/PRE-WORKOUT.png";
import aminoAcidImg from "../../assets/categories/AMINO_ACID.png";
import vitaminsMineralsImg from "../../assets/categories/VITAMIN-AND-MINERAL.png";
import fatBurnerImg from "../../assets/categories/FAT-BURNER.png";
import otherImg from "../../assets/categories/OTHER.png";
import accessoriesImg from "../../assets/categories/ACCESSORIES.png";
// ...

function Categories() {
  const STATIC_CATEGORIES = [
    { category: "protein", image: proteinImg },
    { category: "mass gainer", image: massGainerImg },
    { category: "creatine", image: creatineImg },
    { category: "pre workout", image: preworkoutImg },
    { category: "amino acid", image: aminoAcidImg },
    { category: "vitamin and mineral", image: vitaminsMineralsImg },
    { category: "fat burner", image: fatBurnerImg },
    { category: "other", image: otherImg },
    { category: "accessories", image: accessoriesImg },
  ];

  const [categories] = useState(STATIC_CATEGORIES);

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
              href={`#${item?.category?.toLowerCase().replace(/\s+/g, '-')}`}
              key={item?.category + " -" + index}
              className="category-item flex-shrink-0"
            >
              <div className="text-center">
                <div className="image w-[10vw] min-w-[100px] h-[10vw] min-h-[100px] bg-[#bbb] rounded-full mb-5">
                  <img
                    className="w-full h-full object-cover rounded-full drop-shadow-[0_5px_5px_#444]"
                    src={item?.image}
                    alt={item?.category}
                    onError={(e) => {
                      e.target.src = "/images/placeholder.png";
                    }}
                  />
                </div>
                <h3 className="font-semibold">
                  {item?.category.toUpperCase()
                    // item?.category.slice(1)
                  }
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