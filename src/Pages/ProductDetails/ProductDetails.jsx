import { useParams } from 'react-router-dom';

function ProductDetails() {
    const { productId } = useParams("productId")
    console.log(productId);
    return (
        <section id="products-details">
            <h1>Product Details Page</h1>
        </section>
    )
}

export default ProductDetails