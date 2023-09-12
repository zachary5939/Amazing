import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./Purchases.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserPurchases,
  deletePurchase,
  updatePurchaseQuantity,
} from "../../store/purchases";
import { fetchUserRatings } from "../../store/ratings";
import ConfirmModal from "./modal";

function Purchases() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const sessionUser = useSelector((state) => state.session.user);
  const userId = useSelector((state) => state.session.user?.id);
  const purchases = useSelector((state) => state.purchases.items);
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState("recent");
  const allReviews = useSelector((state) => state.ratings.byProductId || {});
  const userReviews = useSelector((state) => state.ratings.items);
  const purchasesRef = useRef(purchases);
  const [timers, setTimers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchaseToCancel, setPurchaseToCancel] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    purchasesRef.current = purchases;
  }, [purchases]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPurchases(userId));
      dispatch(fetchUserRatings(userId));
      setIsLoading(false);
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimers = {};
      for (const purchase of purchasesRef.current) {
        const timeSincePurchase =
          (Date.now() - new Date(purchase.purchaseDate).getTime()) / 1000;
        updatedTimers[purchase.id] = {
          countdown: Math.max(0, 300 - timeSincePurchase),
          expired: timeSincePurchase >= 300,
        };
      }
      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function formatPrice(price) {
    if (typeof price === "number") {
      return price.toFixed(2);
    }
    return Number(price)?.toFixed(2) || "0.00";
  }

  function handleDelete(purchaseId) {
    setPurchaseToCancel(purchaseId);
    setIsModalOpen(true);
  }

  // function handleDelete(purchaseId) {
  //   if (window.confirm("Are you sure you want to delete this purchase?")) {
  //     dispatch(deletePurchase(purchaseId));
  //   }
  // }

  function ErrorModal({ isOpen, onClose }) {
    return (
      isOpen && (
        <div className="modal-already-reviewed">
          <div className="modal-already-reviewed-content">
            <h2>Error</h2>
            <p>You've already reviewed this product</p>
            <button onClick={onClose}>View my Reviews</button>
          </div>
        </div>
      )
    );
  }

  const navigateToReview = (product) => {
    if (hasReviewedProduct(product?.id)) {
      setIsErrorModalOpen(true); // Open the error modal
    } else {
      history.push(`/newreview/${product?.id}`);
    }
  };


  const hasReviewedProduct = (productId) => {
    return userReviews.some((review) => review?.userId === userId && review?.productId === productId);
  };


  const handleUpdateQuantity = async (purchaseId, newQuantity) => {
    try {
      await dispatch(updatePurchaseQuantity(purchaseId, newQuantity));
      if (userId) {
        await dispatch(fetchUserPurchases(userId));
      }
    } catch (error) {
      console.error("Error updating purchase quantity:", error);
    }
  };

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
    <div className="main-content">
      <div className="content-area">
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
            {sortedPurchases.map((purchase) => {
              const minutes = Math.floor(timers[purchase.id]?.countdown / 60);
              const seconds = Math.round(timers[purchase.id]?.countdown % 60);
              const timeDisplay = timers[purchase.id]
                ? `Time Remaining for Shipment: ${minutes}:${seconds
                    .toString()
                    .padStart(2, "0")} minutes`
                : "Loading...";

              return (
                <li key={purchase?.id} className="purchaseItem_unique">
                  <img
                    src={purchase?.product?.imageUrl}
                    alt={purchase?.product?.name}
                    className="purchaseImage_unique"
                  />
                  <div className="purchaseDetails_unique">
                    <div>{purchase?.product?.name}</div>
                    <div>Total Price: ${formatPrice(purchase?.totalPrice)}</div>
                    <div>
                      Date of Purchase:
                      {new Date(purchase?.purchaseDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="timerContainer_unique">
                    {timers[purchase?.id] && timers[purchase?.id].expired ? (
                      <p>Order has shipped!</p>
                    ) : (
                      <p>{timeDisplay}</p>
                    )}
                  </div>
                  <div className="updateContainer_unique">
                    {!isLoading &&
                    (!timers[purchase?.id] || !timers[purchase?.id].expired) ? (
                      <div>
                        Quantity:
                        <select
                          key={purchase?.quantity}
                          value={purchase?.quantity}
                          onChange={(e) =>
                            handleUpdateQuantity(
                              purchase?.id,
                              parseInt(e.target.value)
                            )
                          }
                        >
                          {[...Array(10)].map((_, idx) => (
                            <option key={idx} value={idx + 1}>
                              {idx + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : null}
                  </div>
                  <div className="deleteContainer_unique">
                    <button
                      onClick={() => navigateToReview(purchase?.product)}
                      className="cartComp-review-button"
                    >
                      Review
                    </button>
                    {!isLoading &&
                    (!timers[purchase?.id] || !timers[purchase?.id].expired) ? (
                      <button onClick={() => handleDelete(purchase?.id)}>
                        Cancel Order
                      </button>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={() => {
          dispatch(deletePurchase(purchaseToCancel));
          setIsModalOpen(false);
          setPurchaseToCancel(null);
        }}
      />
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => {
          setIsErrorModalOpen(false);
          history.push("/reviews");
        }}
      />
    </div>
  );
}

export default Purchases;
