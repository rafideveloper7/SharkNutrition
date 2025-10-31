import React from 'react';
import ProductCard from '../ProductCard/ProductCard'
function CategoryProducts({product, catId}) {
    // ✅ Debug: Check what data is being passed
    console.log("CategoryProducts received:", product);
    
    if (!product?.products || product.products.length === 0) {
        return null; // Don't render empty categories
    }
    
    return (
        <section 
            id={`${product?.category.toLowerCase().replace(/\s+/g, '-')}`} 
            className='py-10'
        >
            <h2 className='text-3xl text-center font-medium pb-5'>
                {product?.category}
            </h2>
            <div className="flex flex-wrap justify-center gap-y-10 px-5">
                {
                    product?.products?.map((item, index) => (
                        <ProductCard
                            key={item?._id || `${catId}-${index}`} 
                            product={item} 
                        />
                    ))
                }
            </div>
        </section>
    )
}
export default CategoryProducts;