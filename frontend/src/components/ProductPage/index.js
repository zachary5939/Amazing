import './ProductPage.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProductById } from '../../store/products';
import { addToCart } from '../../store/cart'; // Import the addToCart action

function ProductPage() {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.products.productById);
    const { productId } = useParams();

    useEffect(() => {
        dispatch(fetchProductById(productId));
    }, [dispatch, productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = () => {
        const quantity = 1; // You can adjust the quantity as needed
        dispatch(addToCart(product.id, quantity));
    };

    return (
        <div className="product-page">
            <div className="product-page__image-container">
                <h2>{product.name}</h2>
                <img src={product.imageUrl} alt={product.name} />
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    )
}

export default ProductPage;
