import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

function CategoryProducts({ product, catId }) {

    if (!product?.products || product.products.length === 0) {
        return null;
    }
    const capitalizeCategory = (str) => {
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

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