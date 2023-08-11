import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartItemQuantity } from "../../store/cart";

function QuantityPopup({ cartItemId, onClose }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1); // Default quantity
  const [errorMessage, setErrorMessage] = useState(null); // State to manage error message

  const handleUpdateQuantity = async () => {
    try {
      await dispatch(updateCartItemQuantity(cartItemId, quantity));
      onClose();
    } catch (error) {
      console.error('Error updating quantity:', error);
      setErrorMessage('An error occurred while updating the quantity.');
    }
  };

  return (
    <div className="quantity-popup">
      <h3>Change the quantity</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
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
