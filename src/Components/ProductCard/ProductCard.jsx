import { Link } from 'react-router-dom'
import './ProductCard.css'
import { useState } from 'react';
function ProductCard({ product, setOpenSearch }) {
    const [isInWishlist, setIsInWishlist] = useState(false);

    function handleWishlist(product) {
        const currentUser = JSON.parse(localStorage.getItem('user'))

        if (currentUser) {
            const allUsers = JSON.parse(localStorage.getItem('users'))
            const isItemAvailable = currentUser?.wishlist?.find(item => item?.productId === product?.productId)
            const foundIndex = allUsers?.findIndex(user => user?.email === currentUser?.email)
            if (!isItemAvailable) {
                setIsInWishlist(!isInWishlist)
                currentUser?.wishlist?.push(product)
            }
            else {
                setIsInWishlist(!isInWishlist)
                currentUser.wishlist = currentUser.wishlist.filter(
                    (item) => item.productId !== product.productId
                );
            }
            allUsers[foundIndex] = currentUser
            localStorage.setItem('user', JSON.stringify(currentUser))
            localStorage.setItem('users', JSON.stringify(allUsers))
        }
    }

    return (
        <div className="product-card-container w-90 min-h-[385px]">
            <div className="product-card w-full h-full rounded-4xl hover:shadow-[0_0_20px_#ffffff6b] p-5">
                <div className="image w-full h-70 bg-[#ccc] rounded-lg">
                    <Link onClick={() => setOpenSearch?.(false)} to={`/products/${product.productId}`}>
                        <img className='w-full h-full object-cover rounded-md drop-shadow-[0_5px_5px_#444]' src={product?.image} alt={product?.name} />
                    </Link>
                </div>
                <div className="content">
                    <h4 className=' my-3'>{product?.name}</h4>
                    <div className="flex justify-between items-center">
                        <p className='font-semibold'>Rs {product?.price}</p>
                        <button className='cursor-pointer' onClick={() => handleWishlist(product)} >
                            <i className={`${isInWishlist ? "fa-solid fa-heart" : "fa-regular fa-heart"}`}></i>
                        </button>
                    </div>
                    <p className='description text-sm mt-3 text-[#bbb]'>{product?.description?.slice(0, 115) + '...'}</p>
                    <button className='add-to-cart cursor-pointer bg-blue text-black mt-2 rounded-md text-sm py-1 px-2 font-semibold'>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard