import './cart.css';

function ConfirmModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>Are you sure you want to remove this product from your cart?</p>
                <button onClick={onConfirm}>Yes, Remove</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}
