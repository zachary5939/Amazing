import "./ProductPage.css";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { fetchProductById } from "../../store/products";
import { fetchCartItems, addToCart } from "../../store/cart";

function ProductPage() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.productById);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchProductById(productId));
    if (user) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, productId, user]);

  //The useMemo hook only runs when one of its dependencies update.
  //https://legacy.reactjs.org/docs/hooks-reference.html#usememo

  const productQuantityInCart = useMemo(() => {
    return cartItems.find((item) => item.productId === parseInt(productId))?.quantity || 0;
  }, [cartItems, productId]);

  const isProductSoldOut = useMemo(() => {
    return productQuantityInCart >= 10;
  }, [productQuantityInCart]);

  const maxQuantityToAdd = useMemo(() => {
    return 10 - productQuantityInCart;
  }, [productQuantityInCart]);

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart(user.id, product.id, quantity));
      alert("Successfully added to cart");
      dispatch(fetchCartItems(user.id));
    } catch (error) {
      alert("Failed to add to cart");
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  const notLoggedIn = () => {
    history.push("/login");
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
        <p>Reviews coming soon. Average rating here.</p>
      </div>

      <div className="product-page__right">
        <p>Total Price: ${totalPrice}</p>
        <p>{isProductSoldOut ? "Sold Out" : "In Stock"}</p>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <select
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          >
            {[...Array(maxQuantityToAdd).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>
        {user ? (
          isProductSoldOut ? (
            <button disabled>Limit 10 Per person</button>
          ) : (
            <button onClick={handleAddToCart}>Add to Cart</button>
          )
        ) : (
          <button onClick={notLoggedIn}>Please login to purchase</button>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
