import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { fetchUserRatings } from "../../store/ratings";
import "./reviews.css";

function Reviews() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userId = user ? user.id : null;
  const ratings = useSelector((state) => state.ratings.items).filter(
    (rating) => rating.userId === userId
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserRatings(userId));
    }
  }, [dispatch, userId]);

  // if (!user) {
  //     return <Redirect to="/login" />;
  // }

  return (
    <div>
      <h2 className="category-name">My Reviews</h2>
      <div className="reviews-container">
        {ratings.map((rating) => (
          <div key={rating?.id} className="review-item">
          <div className="review-content">
              <Link to={`/products/${rating?.productId}`}>
                  <img src={rating?.product?.imageUrl} alt={rating.product.name} />
              </Link>
              <div className="review-details">
                  <h3 className="review-product-name">
                      <Link to={`/products/${rating?.productId}`}>{rating.product.name}</Link>
                  </h3>
                  <p className="review-text">{rating?.text}</p>
                  <p className="review-rating">Rating: {rating?.rating}</p>
              </div>
          </div>
          <div className="buttons-container">
              <button className="review-btn edit-review-btn">Edit Review</button>
              <button className="review-btn delete-review-btn">Delete Review</button>
          </div>
      </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
