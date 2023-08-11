import './ProductPage.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProductById } from '../../store/products';

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

    return (
        <div className="product-page">
            <div className="product-page__image-container">
                <h2>{product.name}</h2>
                <img src={product.imageUrl} alt={product.name} />
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
            </div>
        </div>
    )
}


export default ProductPage;
