import React, { useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';

function CategoryProducts({ product, catId }) {

    if (!product?.products || product.products.length === 0) {
        return null;
    }
    const capitalizeCategory = (str) => {
        return str
            .split(' ')
            .map(word => word?.toUpperCase())
            .join(' ');
        //  + word.slice(1).toLowerCase()
    };

    // ✅ Save scroll position
    useEffect(() => {
        let timeoutId = null;

        const handleScroll = () => {
            if (timeoutId) return;

            timeoutId = setTimeout(() => {
                sessionStorage.setItem("plpScroll", window.scrollY);
                timeoutId = null;
            }, 200);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    // ✅ Restore scroll position
    useEffect(() => {
        const scrollPos = sessionStorage.getItem("plpScroll");

        if (scrollPos) {
            setTimeout(() => {
                window.scrollTo(0, parseInt(scrollPos));
            }, 300);
        }
    }, []);

    return (
        <section
            id={`${product?.category.toLowerCase().replace(/\s+/g, '-')}`}
            className='py-10 px-[2vw]'
        >
            <h2 className='text-3xl text-center font-medium pb-5'>
                {capitalizeCategory(product?.category)}
            </h2>
            <div className="grid grid-cols-2 gap-[2vw] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {product?.products?.map((item, index) => (
                    <ProductCard
                        key={item?._id || `${catId}-${index}`}
                        product={item}
                    />
                ))}
            </div>
        </section>
    );
}

export default CategoryProducts;