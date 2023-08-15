import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRating } from "../../store/ratings";
import { useParams, useHistory } from "react-router-dom";
import { fetchProductById } from "../../store/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./CreateReview.css";

function ReviewForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // Step 1
  const product = useSelector((state) => state.products.productById);
  const [hoveredStar, setHoveredStar] = useState(null);

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
              index + 1 <= (editing && hoveredStar ? hoveredStar : rating)
                ? "active"
                : ""
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

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const user = useSelector((state) => state.session.user);
  const userId = user?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
        setErrorMessage("Please give it a rating, 1 through 5");
        return;
    }
    if (!text.trim()) {
        setErrorMessage("You haven't written a review.");
        return;
    }
    dispatch(addRating(userId, product.id, rating, text));
    history.push(`/products/${product.id}`);
};

  return (
    <div>
      <h2>Review for {product?.name}</h2>
      <img src={product?.imageUrl} alt={product?.name} />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <StarRating
            rating={rating}
            editing={true}
            onStarClick={(number) => setRating(number)}
          />
        </div>
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your review here..."
          />
        </div>
        <div>
          <button type="submit">Submit Review</button>
        </div>
      </form>
    </div>
  );
}
export default ReviewForm;
