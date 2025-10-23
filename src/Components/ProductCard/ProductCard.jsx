import { Link } from 'react-router-dom'
import './ProductCard.css'
function ProductCard({ product }) {
    return (
        <div className="product-card-container w-90 min-h-[385px]">
            <div className="product-card w-full h-full rounded-4xl hover:shadow-[0_0_20px_#ffffff6b] p-5">
                <div className="image w-full h-70">
                    <Link to={`/products/${product.id}`}>
                        <img className='w-full h-full object-cover rounded-md' src={product?.image} alt={product?.name} />
                    </Link>
                </div>
                <div className="content">
                    <h4 className=' my-3'>{product?.name}</h4>
                    <div className="flex justify-between items-center">
                        <p className='font-semibold'>Rs {product?.price}</p>
                        <button><i className="fa-regular fa-heart text-xl cursor-pointer me-2"></i></button>
                    </div>
                    <p className='description text-sm mt-3 text-[#bbb]'>{product?.description?.slice(0, 115) + '...'}</p>
                    <button className='add-to-cart cursor-pointer bg-green text-black mt-2 rounded-md text-sm py-1 px-2 font-semibold'>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard