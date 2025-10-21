import React from 'react'
import { useParams } from 'react-router-dom';

function ProductDetails() {
    const { productId } = useParams("productId")
    console.log(productId);
    return (
        <div>ProductDetails</div>
    )
}

export default ProductDetails