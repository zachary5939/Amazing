import "./ProductPage.css";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductById } from "../../store/products";
import { addToCart } from "../../store/cart";

function ProductPage() {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.products.productById);
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);
    const user = useSelector((state) => state.session.user);
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchProductById(productId));
    }, [dispatch, productId]);

    const notLoggedIn = () => {
        history.push("/login");
    };

    const handleAddToCart = async () => {
        try {
            await dispatch(addToCart(user.id, product.id, quantity));
            alert("Successfully added to cart");
        } catch (error) {
            alert("Failed to add to cart");
        }
    };

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        setQuantity(newQuantity);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    const totalPrice = (product.price * quantity).toFixed(2);

    return (
        <div className="product-page">
            <div className="product-page__image-container">
                <img src={product.imageUrl} alt={product.name} />
            </div>

            <div className="product-page__center">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>MSRP: ${product.price}</p>
                {/* Add reviews here when you have them */}
            </div>

            <div className="product-page__right">
                <p>Total Price: ${totalPrice}</p>
                <p>In stock</p>
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <select id="quantity" value={quantity} onChange={handleQuantityChange}>
                        {[...Array(10).keys()].map((num) => (
                            <option key={num + 1} value={num + 1}>
                                {num + 1}
                            </option>
                        ))}
                    </select>
                </div>
                {user ? (
                    <button onClick={handleAddToCart}>Buy Now</button>
                ) : (
                    <button onClick={notLoggedIn}>Please login to purchase</button>
                )}
            </div>
        </div>
    );
}

export default ProductPage;
