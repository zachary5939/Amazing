import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, removeFromCart, updateCartItemQuantity } from "../../store/cart";
import { Link } from "react-router-dom";
import QuantityPopup from "./QuantityPopup"; // Import the new component

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.session.user);
  const isLoading = useSelector((state) => state.cart.isLoading);
  const error = useSelector((state) => state.cart.error);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user, cartItems]);

  const handleRemoveFromCart = (cartItemId) => {
    dispatch(removeFromCart(cartItemId));
  };

  const [selectedCartItem, setSelectedCartItem] = useState(null);

  const handleOpenPopup = (cartItemId) => {
    setSelectedCartItem(cartItemId);
  };

  const handleClosePopup = () => {
    setSelectedCartItem(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>Please log in to view your cart.</div>;
  }

  if (!cartItems || cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cartItems.map((cartItem) => (
          <li key={cartItem.id}>
            <div>
              {cartItem.product ? ( // Conditional rendering for product-related data
                <Link to={`/products/${cartItem.product.id}`}>
                  <img
                    src={cartItem.product.imageUrl}
                    alt={cartItem.product.name}
                  />
                </Link>
              ) : (
                <p>Loading product data...</p>
              )}
              {cartItem.product ? ( // Conditional rendering for product-related data
                <div>
                  <p>
                    {cartItem.product.name} - ${cartItem.product.price.toFixed(2)} - Quantity: {cartItem.quantity} - Total: ${(cartItem.product.price * cartItem.quantity).toFixed(2)}
                  </p>
                </div>
              ) : (
                <p>Loading product data...</p>
              )}
              <button onClick={() => handleRemoveFromCart(cartItem.id)}>
                Remove
              </button>
              <button onClick={() => handleOpenPopup(cartItem.id)}>
                Update Quantity
              </button>
              {selectedCartItem === cartItem.id && (
                <QuantityPopup cartItemId={cartItem.id} onClose={handleClosePopup} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
