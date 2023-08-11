import "./ProductPage.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; // Import useState
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
        <h2>{product.name}</h2>
        <img src={product.imageUrl} alt={product.name} />
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <select
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductPage;
