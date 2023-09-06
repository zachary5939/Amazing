import React from "react";
import "./Purchases.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPurchases } from "../../store/purchases";
import { restoreUser } from "../../store/session";
import { useEffect, useState } from "react";

function Purchases() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userId = user ? user.id : null;
  const purchases = useSelector((state) => state.purchases.items);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      if (userId) {
          dispatch(fetchUserPurchases(userId));
          setIsLoading(false);
      }
  }, [dispatch, userId]);

  if (isLoading) {
      return <div>Loading...</div>;
  }

  return (
    <div className="purchasesContainer_unique">
      <h1>Your Purchases</h1>
      {purchases.length === 0 && <p>You haven't made any purchases yet.</p>}
      <ul>
        {purchases.map((purchase) => (
          <li key={purchase.id} className="purchaseItem_unique">
            <img
              src={purchase.product.imageUrl}
              alt={purchase.product.name}
              className="purchaseImage_unique"
            />
            <div className="purchaseDetails_unique">
              <div>Product Name: {purchase.product.name}</div>
              <div>Product ID: {purchase.productId}</div>
              <div>Quantity: {purchase.quantity}</div>
              <div>Total Price: ${purchase.totalPrice.toFixed(2)}</div>
              <div>
                Date of Purchase:{" "}
                {new Date(purchase.purchaseDate).toLocaleDateString()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Purchases;
