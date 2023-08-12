import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, removeFromCart } from "../../store/cart";
import { Link } from "react-router-dom";
import QuantityPopup from "./QuantityPopup";
import "./cart.css";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items).sort((a, b) => a.product.name.localeCompare(b.product.name));
  const user = useSelector((state) => state.session.user);
  const isLoading = useSelector((state) => state.cart.isLoading);
  const error = useSelector((state) => state.cart.error);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showUpdateQuantityPopup, setShowUpdateQuantityPopup] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user]);

  const handleOpenConfirmModal = (cartItemId) => {
    setShowConfirmModal(true);
    setItemToRemove(cartItemId);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setItemToRemove(null);
  };

  const handleOpenUpdateQuantityPopup = (cartItemId) => {
    setShowUpdateQuantityPopup(true);
    setItemToUpdate(cartItemId);
  };

  const handleCloseUpdateQuantityPopup = () => {
    setShowUpdateQuantityPopup(false);
    setItemToUpdate(null);
  };

  const confirmRemove = () => {
    dispatch(removeFromCart(itemToRemove));
    handleCloseConfirmModal();
  };

  const comingSoon = () => {
    onclick = alert("Feature coming soon!");
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
          <li key={cartItem.id} className="cart-item">
            <div className="product-details">
              <Link to={`/products/${cartItem.product.id}`}>
                <img
                  src={cartItem.product.imageUrl}
                  alt={cartItem.product.name}
                  className="product-image"
                />
              </Link>
              <div>
                <p className="product-name">{cartItem.product.name}</p>
                <p className="product-description">{cartItem.product.description}</p>
                <p className="product-price">Price: ${Number(cartItem.product.price).toFixed(2)}</p>
                <p className="product-quantity">Quantity: {cartItem.quantity}</p>
              </div>
            </div>
            <div className="product-actions">
              <p className="total-price">Total: ${(cartItem.product.price * cartItem.quantity).toFixed(2)}</p>
              <button className="update-quantity-button" onClick={() => handleOpenUpdateQuantityPopup(cartItem.id)}>Update Quantity</button>
              <button className="remove-button" onClick={() => handleOpenConfirmModal(cartItem.id)}>Remove</button>
              <button onClick={comingSoon} className="review-button">Review</button>
            </div>
            {showConfirmModal && (
              <div className="confirm-modal">
                <p>Are you sure you want to remove this item?</p>
                <button onClick={confirmRemove}>Yes</button>
                <button onClick={handleCloseConfirmModal}>No</button>
              </div>
            )}
            {showUpdateQuantityPopup && itemToUpdate === cartItem.id && (
              <QuantityPopup cartItemId={itemToUpdate} onClose={handleCloseUpdateQuantityPopup} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
