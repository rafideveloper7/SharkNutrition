import { Link } from 'react-router-dom';
import './ProductCard.css';
import { useState, useEffect } from 'react';
import AddToCart from '../AddToCart/AddToCart'

function ProductCard({ product, refreshWishlist }) {
    const [isInWishlist, setIsInWishlist] = useState(false);

    // Check if product is in wishlist on mount
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const isItemAvailable = currentUser?.wishlist?.some(
            item => item?.productId === product?.productId
        );
        setIsInWishlist(!!isItemAvailable);
    }, [product]);

    // Handle wishlist toggle
    function handleWishlist(product) {
        // Har click par fresh user data lo
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const allUsers = JSON.parse(localStorage.getItem('users')) || [];
        const foundIndex = allUsers.findIndex(u => u?.email === currentUser?.email);

        if (!currentUser) return;

        let updatedWishlist = [...(currentUser?.wishlist || [])];

        if (isInWishlist) {
            // Remove
            updatedWishlist = updatedWishlist.filter(
                item => item?.productId !== product?.productId
            );
        } else {
            // Add (check if not duplicate)
            const alreadyExists = updatedWishlist.some(
                item => item?.productId === product?.productId
            );
            if (!alreadyExists) updatedWishlist.push(product);
        }

        // Update both user objects
        const updatedUser = { ...currentUser, wishlist: updatedWishlist };
        if (foundIndex !== -1) {
            allUsers[foundIndex] = updatedUser;
        }

        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
        localStorage.setItem('users', JSON.stringify(allUsers));

        // Update UI
        setIsInWishlist(!isInWishlist);

        // Notify parent wishlist page (optional)
        if (typeof refreshWishlist === 'function') refreshWishlist();
    }

    return (
        <div className="product-card-container w-90 min-h-[385px]">
            <div className="product-card w-full h-full rounded-4xl hover:shadow-[0_0_20px_#ffffff6b] p-5">
                <div className="image w-full h-70 bg-[#ccc] rounded-lg">
                        <img
                            className="w-full h-full object-cover rounded-md drop-shadow-[0_5px_5px_#444]"
                            src={product?.image}
                            alt={product?.name}
                        />
                </div>

                <div className="content">
                    <h4 className="my-3">{product?.name}</h4>

                    <div className="flex justify-between items-center mb-3">
                        <p className="font-semibold">Rs {product?.price}</p>
                        <button className="cursor-pointer" onClick={() => handleWishlist(product)}>
                            <i
                                className={`${
                                    isInWishlist
                                        ? 'fa-solid fa-heart text-red-500'
                                        : 'fa-regular fa-heart'
                                }`}
                            ></i>
                        </button>
                    </div>

                    {(product?.flavor || product?.weight) && (
                        <div className="flavor-weight flex justify-between items-center py-1 pb-2">
                            <button
                                className={`text-xs rounded-md border-gray-500 ${
                                    product?.flavor && 'p-1 border-1'
                                }`}
                            >
                                {product?.flavor}
                            </button>
                            <p className="text-blue">{product?.weight}</p>
                        </div>
                    )}

                    <AddToCart product={product}/>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
