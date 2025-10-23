import ProductCard from '../ProductCard/ProductCard'
function CategoryProducts({product, catId}) {
    
    return (
        <section id={`${product?.category.toLowerCase().replace(/\s+/g, '-')}`} className='py-10'>
            <h2 className='text-3xl text-center font-medium pb-5'>{product?.category}</h2>
            <div className="flex flex-wrap justify-center gap-y-10 px-5">
                {
                    product?.products?.map(item => (
                        <ProductCard key={catId + '-' + item?.productId} product={item} />
                    ))
                }
            </div>
        </section>
    )
}

export default CategoryProducts
{/* <p className=''><del className='text-[#bbb] me-2'>Rs50,000</del> <ins className='no-underline'><strong>Rs42,000</strong></ins></p> */}