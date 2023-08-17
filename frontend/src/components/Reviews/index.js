import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  fetchUserRatings,
  removeRating,
  updateRating,
} from "../../store/ratings";
import logo from "../../img/amazinglogoblack.png";
import "./reviews.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Reviews() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const userId = user ? user.id : null;
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [reviewToDelete, setReviewToDelete] = React.useState(null);
  const [editingReview, setEditingReview] = React.useState(null);
  const [updatedRating, setUpdatedRating] = React.useState(0);
  const [updatedText, setUpdatedText] = React.useState("");
  const [hoveredStar, setHoveredStar] = React.useState(null);
  const ratings = useSelector((state) => state.ratings.items).filter(
    (rating) => rating.userId === userId
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserRatings(userId));
    }
  }, [dispatch, userId]);

  const handleOpenConfirmModal = (ratingId) => {
    setReviewToDelete(ratingId);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setReviewToDelete(null);
  };

  const confirmDelete = () => {
    dispatch(removeRating(reviewToDelete));
    setShowConfirmModal(false);
  };

  const handleEditReview = (rating) => {
    setEditingReview(rating.id);
    setUpdatedRating(rating.rating);
    setUpdatedText(rating.text);
  };

  const handleStarClick = (number) => {
    setUpdatedRating(number);
  };

  const handleTextChange = (e) => {
    setUpdatedText(e.target.value);
  };

  const handleUpdateReview = () => {
    dispatch(updateRating(editingReview, updatedRating, updatedText));
    setEditingReview(null);
  };

  const StarRating = ({
    rating,
    editing = false,
    onStarClick,
    onStarHover,
    onStarLeave,
  }) => {
    return (
      <div className="rating-container">
        {[...Array(5)].map((_, index) => (
          <FontAwesomeIcon
            className={`star ${
              index < (editing ? hoveredStar : rating) ? "active" : ""
            }`}
            icon={faStar}
            key={index}
            onClick={() => editing && onStarClick && onStarClick(index + 1)}
            onMouseEnter={() =>
              editing && onStarHover && onStarHover(index + 1)
            }
            onMouseLeave={() => editing && onStarLeave && onStarLeave()}
          />
        ))}
        {editing && hoveredStar && (
          <span className="hovered-rating-text">{hoveredStar}/5</span>
        )}
      </div>
    );
  };

  if (!ratings.length) {
    return (
      <div className="empty-reviews-container">
        <h1>{user?.firstName}, you haven't reviewed anything!</h1>
        <p>Browse our products and add something to your cart to review it!</p>
        <img src={logo} alt="Logo" />
        <button
          className="show-products-btn"
          onClick={() => history.push("/products")}
        >
          Show me products
        </button>
      </div>
    );
  }

  return (
    <div>
      {showConfirmModal && (
        <div className="modal-background">
          <div className="cartComp-confirm-modal">
            <p className="delete-text">
              Are you sure you want to remove this review?
            </p>
            <button className="delete-button" onClick={confirmDelete}>
              Yes
            </button>
            <button className="delete-button" onClick={handleCloseConfirmModal}>
              No
            </button>
          </div>
        </div>
      )}

      <h2 className="category-name">{user?.firstName}'s Reviews</h2>

      <div className="reviews-container">
        {ratings.map((rating) => (
          <div key={rating?.id} className="review-item">
            <div className="review-content">
              <Link to={`/products/${rating?.productId}`}>
                <img
                  src={rating?.product?.imageUrl}
                  alt={rating?.product?.name}
                />
              </Link>
              <div className="review-details">
                <h3 className="review-product-name">
                  <Link to={`/products/${rating?.productId}`}>
                    {rating?.product?.name}
                  </Link>
                </h3>

                {editingReview === rating.id ? (
                  <>
                    <textarea
                      className="edit-review"
                      value={updatedText}
                      onChange={handleTextChange}
                      maxLength="240"
                    />
                    <div className="character-count">
                      {updatedText.length}/240
                    </div>
                    <div className="rating-container">
                      {[...Array(5)].map((_, index) => (
                        <FontAwesomeIcon
                          className={`star ${
                            index < updatedRating ? "active" : ""
                          }`}
                          icon={faStar}
                          key={index}
                          onClick={() => handleStarClick(index + 1)}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="review-text">{rating?.text}</p>
                    <StarRating rating={rating?.rating} />
                  </>
                )}
              </div>
            </div>

            <div className="buttons-container">
              {editingReview === rating.id ? (
                <>
                  <button
                    className="review-btn save-review-btn"
                    onClick={handleUpdateReview}
                  >
                    Save
                  </button>
                  <button
                    className="review-btn cancel-review-btn"
                    onClick={() => setEditingReview(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="review-btn edit-review-btn"
                    onClick={() => handleEditReview(rating)}
                  >
                    Edit Review
                  </button>
                  <button
                    className="review-btn delete-review-btn"
                    onClick={() => handleOpenConfirmModal(rating?.id)}
                  >
                    Delete Review
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
