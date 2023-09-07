import React, { useEffect, useState } from "react";
import "./Purchases.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPurchases, deletePurchase } from "../../store/purchases";

function Purchases() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userId = user ? user.id : null;
  const purchases = useSelector((state) => state.purchases.items);
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState("recent");

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPurchases(userId));
      setIsLoading(false);
    }
  }, [dispatch, userId]);

  function formatPrice(price) {
    if (typeof price === "number") {
      return price.toFixed(2);
    }
    return Number(price)?.toFixed(2) || "0.00";
  }

  function handleDelete(purchaseId) {
    if (window.confirm("Are you sure you want to delete this purchase?")) {
      dispatch(deletePurchase(purchaseId));
    }
  }

  let sortedPurchases = [...purchases];
  switch (sortType) {
    case "productName":
      sortedPurchases.sort((a, b) =>
        a.product.name.localeCompare(b.product.name)
      );
      break;
    case "price":
      sortedPurchases.sort((a, b) => b.totalPrice - a.totalPrice);
      break;
    case "oldest":
      sortedPurchases.sort(
        (a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate)
      );
      break;
    default:
      sortedPurchases.sort(
        (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
      );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="purchasesContainer_unique">
      <h1>Your Purchases</h1>
      <div className="sortContainer_unique">
        <label htmlFor="sortType">Sort by: </label>
        <select
          id="sortType"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="recent">Most Recent</option>
          <option value="oldest">Oldest</option>
          <option value="productName">Product Name</option>
          <option value="price">Price</option>
        </select>
      </div>
      {purchases.length === 0 && <p>You haven't made any purchases yet.</p>}
      <ul>
        {sortedPurchases.map((purchase) => (
          <li key={purchase.id} className="purchaseItem_unique">
            <img
              src={purchase?.product?.imageUrl}
              alt={purchase?.product?.name}
              className="purchaseImage_unique"
            />
            <div className="purchaseDetails_unique">
              <div>{purchase?.product?.name}</div>
              <div>Quantity: {purchase?.quantity}</div>
              <div>Total Price: ${formatPrice(purchase?.totalPrice)}</div>
              <div>
                Date of Purchase:
                {new Date(purchase?.purchaseDate).toLocaleDateString()}
              </div>
              <button onClick={() => handleDelete(purchase.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Purchases;
