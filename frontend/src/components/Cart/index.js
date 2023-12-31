import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, updateCartItemQuantity, removeFromCart, clearUserCart } from "../../store/cart";
import { finalizePurchase } from "../../store/purchases";
import { fetchUserRatings } from "../../store/ratings";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../img/amazinglogoblack.png";
import "./cart.css";

function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const allReviews = useSelector(state => state.ratings.byProductId || {});

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
  const [showErrorModal, setShowErrorModal] = useState(false);
  const grandTotal = cartItems.reduce((acc, item) => {
    if (item && item.product) {
      return acc + item.product.price * item.quantity;
    }
    return acc;
  }, 0);

  useEffect(() => {
    if (sessionUser) {
      dispatch(fetchUserRatings(sessionUser.id));
      dispatch(fetchCartItems(sessionUser.id));
    }
  }, [dispatch, sessionUser]);

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

  const completePurchase = () => {
    dispatch(finalizePurchase(sessionUser.id));
    dispatch(clearUserCart(sessionUser.id));
    history.push("/complete");
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

  const hasReviewedProduct = (productId) => {
    const reviewsForProduct = allReviews[productId] || [];
    return reviewsForProduct.some((review) => review.userId === sessionUser.id);
  };

  const navigateToReview = (product) => {
    if (hasReviewedProduct(product.id)) {
      setShowErrorModal(true);
    } else {
      history.push(`/newreview/${product.id}`);
    }
  };



  if (!sessionUser) {
    return (
      <div className="main-content">
        <div className="content-area">
      <div className="cartComp-info-container">
        <p className="cartComp-plz-login">Please sign in to view your cart.</p>
        <img src={logo} alt="Amazing Logo" className="cartComp-website-logo" />
        <Link to="/login">
          <button className="cartComp-login-button">Login to view cart</button>
        </Link>
      </div>
      </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="main-content">
        <div className="content-area">
      <div className="cartComp-info-container">
        <p className="cartComp-plz-login">{sessionUser?.firstName}, your cart is empty!</p>
        <img src={logo} alt="Amazing Logo" className="cartComp-website-logo" />
        <Link to="/products">
          <button className="cartComp-login-button">View All Products!</button>
        </Link>
      </div>
      </div>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="main-content">
      <div className="content-area">
    <div className="cartComp-cart">
      <h2>Shopping Cart</h2>
      <ul>
{cartItems.map(({ id, product, quantity }) => (
  <React.Fragment key={id}>
    <li className="cartComp-cart-item">
      <div className="cartComp-product-details">
        <Link to={`/products/${product?.id}`}>
          <img
            src={product?.imageUrl}
            alt={product?.name}
            className="cartComp-product-image"
          />
        </Link>
        <div>
          <p className="cartComp-product-name">{product?.name}</p>
          <p className="cartComp-product-description">{product?.description}</p>
          <p className="cartComp-product-price">Price: ${Number(product?.price).toFixed(2)}</p>
          <p className="cartComp-product-quantity">Quantity: {quantity}</p>
        </div>
      </div>
      <div className="cartComp-product-actions">
        {itemToUpdate === id ? (
          <>
            <select
              value={updateQuantities[id] || quantity}
              onChange={(e) => setUpdateQuantities({
                ...updateQuantities,
                [id]: parseInt(e.target.value, 10)
              })}
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
            <button className="cartComp-update-quantity-button" onClick={() => handleUpdateQuantity(id)}>Confirm</button>
            <button className="cartComp-remove-button" onClick={handleCloseUpdateQuantityPopup}>Cancel</button>
          </>
        ) : (
          <>
            <p className="cartComp-total-price">
              Total: ${(product?.price * quantity).toFixed(2)}
            </p>
            <button className="cartComp-update-quantity-button" onClick={() => handleOpenUpdateQuantityPopup(id)}>Update Quantity</button>
          </>
        )}

        <button className="cartComp-remove-button" onClick={() => handleOpenConfirmModal(id)}>Remove</button>
      </div>
    </li>
    {showConfirmModal && (
      <div className="cartComp-confirm-modal">
        <p className="delete-text">Are you sure you want to remove this item?</p>
        <button className="delete-button" onClick={confirmRemove}>Yes</button>
        <button className="delete-button" onClick={handleCloseConfirmModal}>No</button>
      </div>
    )}
  </React.Fragment>
))}
      </ul>
      <p className="cartComp-grand-total">Grand Total: ${grandTotal.toFixed(2)}</p>
      <button className="cartComp-complete-purchase-button" onClick={completePurchase}>Complete Purchase</button>
      {showErrorModal && (
        <div className="error-modal">
          <p>You've already reviewed this product. To manage your reviews, check out your review page.</p>
          <button onClick={() => history.push("/reviews")}>Go to Reviews</button>
          <button onClick={() => setShowErrorModal(false)}>Close</button>
        </div>
      )}
    </div>
    </div>
    </div>
  );

}

export default Cart;
