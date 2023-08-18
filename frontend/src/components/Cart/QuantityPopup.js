import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItemQuantity, fetchCartItems } from "../../store/cart";
import * as sessionActions from "../../store/session";

function QuantityPopup({ cartItemId, onClose }) {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.userId);

    const [quantity, setQuantity] = useState(1);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleUpdateQuantity = async () => {
        try {
            await dispatch(updateCartItemQuantity(cartItemId, quantity));
            await dispatch(fetchCartItems(userId));
            onClose();
        } catch (error) {
            console.error('Error updating quantity:', error);
            setErrorMessage('An error occurred while updating the quantity.');
        }
    };



  return (
    <div className="quantity-popup">
      <h3>Change the quantity</h3>
      <select value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))}>
        {[...Array(10).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>
            {num + 1}
          </option>
        ))}
      </select>
      <button onClick={handleUpdateQuantity}>Update Quantity</button>
      <button onClick={onClose}>Cancel</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default QuantityPopup;
