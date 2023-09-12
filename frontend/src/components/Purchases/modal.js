import React from 'react';
import './Purchases.css';

function ConfirmModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay_unique">
      <div className="modalContainer_unique">
        <h2>Just to confirm..</h2>
        <p>Are you sure you want to cancel this order?</p>
        <div className="modalButtonsContainer_unique">
          <button className='button-design' onClick={onCancel}>No</button>
          <button className='button-design' onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
