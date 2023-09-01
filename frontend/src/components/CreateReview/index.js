import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRating } from "../../store/ratings";
import { useParams, useHistory } from "react-router-dom";
import { fetchProductById } from "../../store/products";
import { fetchCartItems } from "../../store/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import logo from "../../img/amazinglogoblack.png";
import "./CreateReview.css";

function ReviewForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const product = useSelector((state) => state.products.productById);
  const cartItems = useSelector((state) => state.cart.items);
  const [hoveredStar, setHoveredStar] = useState(null);

//1
  const StarRating = ({
    rating,
    editing = false,
    onStarClick,
    onStarHover,
    onStarLeave,
  }) => (
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
          onMouseEnter={() => editing && onStarHover && onStarHover(index + 1)}
          onMouseLeave={() => editing && onStarLeave && onStarLeave()}
        />
      ))}
      {editing && hoveredStar && (
        <span className="hovered-rating-text">{hoveredStar}/5</span>
      )}
    </div>
  );
  const user = useSelector((state) => state.session.user);
  const userId = user?.id;

  useEffect(() => {
    dispatch(fetchProductById(productId));
    if (userId) {
      dispatch(fetchCartItems(userId));
    }
  }, [dispatch, productId, userId]);

  const isInCart = cartItems.some(item => item.productId === +productId);

  if (!user) {
    return (
      <div className="not-signed-in-container">
        <h1 className="not-signed-in-header">You need to be signed in to do that.</h1>
        <img className="not-signed-in-logo" src={logo} alt="Amazing Logo" />
        <button
          className="not-signed-in-login-button"
          onClick={() => history.push('/login')}
        >
          Log in
        </button>
      </div>
    );
  }

  if (!isInCart) {
    return (
      <div className="not-signed-in-container">
        <h1 className="not-signed-in-header">You need to add this product to your cart in order to review it.</h1>
        <img className="not-signed-in-logo" src={logo} alt="Amazing Logo" />
        <button
          className="not-signed-in-login-button"
          onClick={() => history.push('/products')}
        >
          View All Products
        </button>
      </div>
    );
  }

  const handleTextChange = (e) => {
    setText(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage(null);

    if (rating === 0) {
      setErrorMessage("Please give it a rating, 1 through 5");
      return;
    }

    if (!text.trim()) {
      setErrorMessage("You haven't written a review.");
      return;
    }

    if (text.length > 240) {
      setErrorMessage("Your review exceeds the 240 character limit.");
      return;
    }

    dispatch(addRating(userId, product.id, rating, text));
    history.push(`/products/${product.id}`);
  };

  return (
    <div className="review-container">
      <div className="product-image-container">
        <img src={product?.imageUrl} alt={product?.name} />
      </div>
      <div className="review-form-container">
        <h2>Review for {product?.name}</h2>
        <form onSubmit={handleSubmit}>
          {" "}
          <StarRating
            rating={rating}
            editing={true}
            onStarClick={(number) => setRating(number)}
          />
          <div className="text-area-container">
            <textarea
            className="review-box"
              maxLength="240"
              value={text}
              onChange={handleTextChange}
              placeholder="Write your review here..."
            />
            <div className="character-counter">{charCount}/240</div>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button className="submit-button" type="submit">
            Submit Review
          </button>
        </form>{" "}
      </div>
    </div>
  );
}

export default ReviewForm;
