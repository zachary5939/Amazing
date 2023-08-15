import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, updateCartItemQuantity, removeFromCart } from "../../store/cart";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../img/amazinglogoblack.png";
import "./cart.css";

function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  // Get raw cart items and then sort them safely
  const rawCartItems = useSelector((state) => state.cart.items);
  const cartItems = rawCartItems && rawCartItems.length
    ? [...rawCartItems].sort((a, b) =>
        a.product && b.product ? a.product.name.localeCompare(b.product.name) : 0
      )
    : [];

  const isLoading = useSelector((state) => state.cart.isLoading);
  const error = useSelector((state) => state.cart.error);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showUpdateQuantityPopup, setShowUpdateQuantityPopup] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const [updateQuantities, setUpdateQuantities] = useState({});

  const grandTotal = cartItems.reduce((acc, item) => {
    if (item && item.product) {
      return acc + item.product.price * item.quantity;
    }
    return acc;
  }, 0);


  useEffect(() => {
    if (sessionUser) {
      dispatch(fetchCartItems(sessionUser.id));
    }
  }, [dispatch, sessionUser]);

  // console.log(cartItems, "cartItems");

  const handleUpdateQuantity = async (cartItemId) => {
    try {
      const quantity = updateQuantities[cartItemId];
      if (quantity) {
        await dispatch(updateCartItemQuantity(cartItemId, quantity));
        await dispatch(fetchCartItems(sessionUser.id));
        setItemToUpdate(null);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

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
    alert("Feature coming soon!");
  };

  const navigateToReview = (product) => {
    history.push({
      pathname: '/newreview',
      state: { product },
    });
  };


  const loginPlease = () => {
    history.push("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!sessionUser) {
    return (
      <div className="cartComp-info-container">
        <p className="cartComp-plz-login">Please sign in to view your cart.</p>
        <img src={logo} alt="Amazing Logo" className="cartComp-website-logo" />
        <Link to="/login">
          <button className="cartComp-login-button">Login to view cart</button>
        </Link>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cartComp-info-container">
        <p className="cartComp-plz-login">{sessionUser?.firstName}, your cart is empty!</p>
        <img src={logo} alt="Amazing Logo" className="cartComp-website-logo" />
        <Link to="/products">
          <button className="cartComp-login-button">View All Products!</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cartComp-cart">
      <h2>{sessionUser?.firstName}'s Cart</h2>
      <ul>
          {cartItems.map((cartItem) => (
              <li key={cartItem.id} className="cartComp-cart-item">
                  <div className="cartComp-product-details">
                  <Link to={`/products/${cartItem?.product?.id}`}>
                          <img
                              src={cartItem?.product?.imageUrl}
                              alt={cartItem?.product?.name}
                              className="cartComp-product-image"
                          />
                      </Link>
                      <div>
                          <p className="cartComp-product-name">{cartItem?.product?.name}</p>
                          <p className="cartComp-product-description">{cartItem?.product?.description}</p>
                          <p className="cartComp-product-price">Price: ${Number(cartItem?.product?.price).toFixed(2)}</p>
                          <p className="cartComp-product-quantity">Quantity: {cartItem?.quantity}</p>
                      </div>
                  </div>
                  <div className="cartComp-product-actions">
                      {itemToUpdate === cartItem.id ? (
                          <>
                              <select
                                  value={updateQuantities[cartItem.id] || cartItem.quantity}
                                  onChange={(e) => setUpdateQuantities({
                                      ...updateQuantities,
                                      [cartItem.id]: parseInt(e.target.value, 10)
                                  })}
                              >
                                  {[...Array(10).keys()].map((num) => (
                                      <option key={num + 1} value={num + 1}>
                                          {num + 1}
                                      </option>
                                  ))}
                              </select>
                              <button onClick={() => handleUpdateQuantity(cartItem.id)}>Confirm</button>
                              <button onClick={handleCloseUpdateQuantityPopup}>Cancel</button>
                          </>
                      ) : (
                          <>
                              <p className="cartComp-total-price">
                                  Total: ${(cartItem?.product?.price * cartItem?.quantity).toFixed(2)}
                              </p>
                              <button className="cartComp-update-quantity-button" onClick={() => handleOpenUpdateQuantityPopup(cartItem.id)}>Update Quantity</button>
                          </>
                      )}

                      <button className="cartComp-remove-button" onClick={() => handleOpenConfirmModal(cartItem.id)}>Remove</button>
                      <button onClick={() => navigateToReview(cartItem.product)} className="cartComp-review-button">Review</button>
                  </div>
                  {showConfirmModal && (
                      <div className="cartComp-confirm-modal">
                          <p className="delete-text">Are you sure you want to remove this item?</p>
                          <button className="delete-button" onClick={confirmRemove}>Yes</button>
                          <button className="delete-button" onClick={handleCloseConfirmModal}>No</button>
                      </div>
                  )}
              </li>
          ))}
      </ul>
      <p className="cartComp-grand-total">Grand Total: ${grandTotal.toFixed(2)}</p>
      <button className="cartComp-complete-purchase-button" onClick={comingSoon}>Complete Purchase</button>
    </div>
  );
}

export default Cart;
