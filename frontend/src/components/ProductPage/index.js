import "./ProductPage.css";
import { useParams } from "react-router-dom";
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

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  //error handling
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

  return (
    <div className="product-page">
        <div className="product-page__image-container">
            <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className="product-page__center">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            {/* Add reviews here when you have them */}
        </div>

        <div className="product-page__right">
            <p>Price: ${product.price}</p>
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
                <button disabled>Please login to purchase</button>
            )}
        </div>
    </div>
);
}

export default ProductPage;
